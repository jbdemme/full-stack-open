const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return <div className={'note ' + type}>{message}</div>
}

export default Notification
