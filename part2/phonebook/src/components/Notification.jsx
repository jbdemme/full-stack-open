const Notification = ({ message, type}) => {
  if (message === null) {
    return null
  }

  console.log('This is the message and the type', message, type);
  

  let notificationStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (type === 'note') {
    notificationStyle.color = 'green'
  } else if (type === 'error') {
    notificationStyle.color = 'red'
  }

  console.log(notificationStyle);
  

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
