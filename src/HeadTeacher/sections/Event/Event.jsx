import React, { useState, useRef, useEffect } from 'react';
import './event.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import DOMPurify from 'dompurify';

const newEvents = 'http://127.0.0.1:8000/school/post_events';
const uploadUrl = 'http://127.0.0.1:8000/school/upload_file';
const upcomingevents = 'http://127.0.0.1:8000/school/upcoming_events';

function Event() {
  const [events, setEvents] = useState([]);
  const [fileId, setFileId] = useState('')
  const [newEvent, setNewEvent] = useState({
    id: null, // Add id to the newEvent state
    name: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    image: null,
    files: null,
  });
  const [toolbar, setToolBar] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filename, setFilename] = useState('')
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to track if editing mode

  const editorRef = useRef(null);

  useEffect(() => {
    axios.get(upcomingevents)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching upcoming events:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const applyFormatting = (command, value = null) => {
    document.execCommand(command, false, value);
  };

 
  const insertImage = (e) => {
    const selected = e.target.files[0];
    setNewEvent({ ...newEvent, image: selected });
    if (selected) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.classList.add("eventImg")
        img.style.maxWidth = '100%';
        editorRef.current.appendChild(img);
      };
      reader.readAsDataURL(selected);
    }
  };

  const insertDocument = async (e) => {
    const file = e.target.files[0];
    if(file){
      setFilename(file.name)
      setFileUploadProgress(0)

      const formData = new FormData()
      formData.append('name', file)

      try {
          const response = await axios.post(uploadUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setFileUploadProgress(percentCompleted);
            },
          })
       if(response.data.file_id && response.data.file_url){
           setFileId(response.data.file_id)
           setFileUrl(response.data.file_url)
       }
       setNewEvent({...newEvent, files:parseInt(response.data.file_id)})
          console.log(fileId)
      }catch(err){
        console.log(err)
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("name", newEvent.name);
    if(newEvent.startDate){
      formData.append("startDate", newEvent.startDate);
    }else if(newEvent.endDate){
      formData.append("endDate", newEvent.endDate);
    }
      formData.append("location", newEvent.location);

  
    formData.append("description", DOMPurify.sanitize(newEvent.description));

    if (newEvent.image) {
      formData.append("image", newEvent.image);
    }

    if(newEvent.files){
      formData.append("files", newEvent.files);
    }

    try {
      const response = isEditing
        ? await axios.put(`http://127.0.0.1:8000/school/edit_event/${newEvent.id}`, formData)
        : await axios.post(newEvents, formData);
        
      if (response.status === 200) {
        showSuccessAlert(isEditing ? "Event Updated" : "Event Uploaded");
        setSaving(false);
        setIsEditing(false); // Reset editing mode
        setNewEvent({
          id: null,
          name: '',
          description: '',
          location: '',
          startDate: '',
          endDate: '',
          image: null,
          files: null,
        }); // Reset form
        setFilename('')
        setEvents(isEditing ? events.map(event => event.id === newEvent.id ? response.data : event) : [...events, response.data]); // Update event list
      }
    } catch (err) {
      console.log(err);
      setSaving(false);
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      timer: 4000,
      toast: true,
      timerProgressBar: true,
      showConfirmButton: true,
    });
  };

  const showToolBar = () => {
    setToolBar(!toolbar);
  };

  const handleDelete = async (id)=>{
    try{
       await axios.delete(`http://127.0.0.1:8000/school/delete_event/${id}`)
       const remainedEvent = events.filter(event => event.id !== id)
       setEvents(remainedEvent)
    }catch(err){
      console.log(err)
    }
  }

  const handleEdit = (id) => {
    const eventToEdit = events.find(event => event.id === id);
    setNewEvent({
      id: eventToEdit.id,
      name: eventToEdit.name,
      description: eventToEdit.description,
      location: eventToEdit.location,
      startDate: eventToEdit.startDate,
      endDate: eventToEdit.endDate,
      image: null, // Reset image and files as they are not part of eventToEdit
      files: null,
    });
    editorRef.current.innerHTML = eventToEdit.description; // Set editor content
    setIsEditing(true); // Set editing mode
  }

  return (
    <div className="event_container">
      <header className="header">
        <h1 className='text-primary text-center'>Manage Events</h1>
      </header>

      <section className="add-event">
        <h2 className='text-center alert alert-info'>{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="eventName" className="col-sm-2 col-form-label">
              Event Title
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="eventName"
                name="name"
                value={newEvent.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="startDate" className="col-sm-2 col-form-label">
              Start Date
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={newEvent.startDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="endDate" className="col-sm-2 col-form-label">
              End Date
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={newEvent.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-10">
              <div className="toolbar">
                <div className="up">
                  <button type="button" className="bg-secondary" onClick={() => applyFormatting('bold')}>
                    <i className="bi bi-type-bold"></i>
                  </button>
                  <button type="button" className="bg-secondary" onClick={() => applyFormatting('underline')}>
                    <i className="bi bi-type-underline"></i>
                  </button>
                  <button type="button" className="bg-secondary" onClick={() => applyFormatting('italic')}>
                    <i className="bi bi-type-italic"></i>
                  </button>
                  <button type="button" className="bg-secondary">
                    <label htmlFor="insertImage">
                      <i className="bi bi-file-earmark-image-fill"></i>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id="insertImage"
                      hidden
                      onChange={insertImage}
                    />
                  </button>
                  <button type="button" className="bg-secondary">
                    <label htmlFor="insertDocument">
                      <i className="bi bi-file-earmark"></i>
                    </label>
                    <input
                      type="file"
                      id="insertDocument"
                      hidden
                      onChange={insertDocument}
                    />
                  </button>
                  <button
                    type="button"
                    className="bg-secondary"
                    onClick={() => applyFormatting('insertUnorderedList')}
                  >
                    <i className="bi bi-list-ul"></i>
                  </button>
                  <i className="bi bi-three-dots" onClick={showToolBar}></i>
                </div>
                <div className={`down ${toolbar ? 'show' : ''}`}>
                  <ul>
                    <li>
                      <button type="button" className="bg-secondary" onClick={() => applyFormatting('justifyFull')}>
                        <i className="bi bi-justify"></i>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="bg-secondary" onClick={() => applyFormatting('justifyLeft')}>
                        <i className="bi bi-justify-left"></i>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="bg-secondary" onClick={() => applyFormatting('justifyRight')}>
                        <i className="bi bi-justify-right"></i>
                      </button>
                    </li>
                    <li>
                      <select className="bg-secondary text-white p-2" onChange={(e) => applyFormatting('fontSize', e.target.value)}>
                        <option value="1">Small</option>
                        <option value="3">Normal</option>
                        <option value="5">Large</option>
                        <option value="7">Huge</option>
                      </select>
                    </li>
                    <li>
                      <select className="bg-secondary text-white p-2" onChange={(e) => applyFormatting('fontName', e.target.value)}>
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </li>
                    <li>
                      <input
                        type="color"
                        className="bg-secondary"
                        onChange={(e) => applyFormatting('foreColor', e.target.value)}
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <p className='text-danger'>Only one file and image can be submitted at a time (upload pdf files for faster upload)</p>
              <div
                className="cont"
                contentEditable="true"
                ref={editorRef}
                onInput={(e) => setNewEvent({ ...newEvent, description: e.currentTarget.innerHTML })}
              ></div>
                <div className="progress-wrapper">
                   {filename ? (
                    <>
                    <ul>
                    <li>
                      <a href={fileUrl} className='reduce_letter'>{filename}</a>
                      <div className="progress-bar p-2"  style={{ width: `${fileUploadProgress}%` }}>
                           {fileUploadProgress}%
                      </div>
                    </li>
                    </ul>
                    </>
                   ) : ''}
                </div>
            </div>
           
          </div>
          <div className="row mb-3">
            <label htmlFor="location" className="col-sm-2 col-form-label">
              Location
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
              />
            </div>
           
          </div>
          <button type="submit" className="btn btn-primary">
            {saving ? 'Saving...' : isEditing ? 'Update' : 'Save'}
          </button>
        </form>
      </section>

      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        <div className="events">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Event Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Location</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((upevent, index) => {
                const { id, name, startDate, endDate, location } = upevent;
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{name}</td>
                    <td>{startDate}</td>
                    <td>{endDate}</td>
                    <td>{location}</td>
                    <td>
                      <ul className='actions'>
                        <li><i className="bi bi-archive-fill" onClick={() => handleDelete(id)}></i></li>
                        <li><i className="bi bi-pen-fill" onClick={() => handleEdit(id)}></i></li>
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Kampala Infant School. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Event;
