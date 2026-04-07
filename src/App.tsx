function App() {

  const dbUsers = [
    { id: 1, name: "kuba" },
    { id: 2, name: "FFFD" },
    { id: 3, name: "kuSGQba" },
  ]
  const listUsers = dbUsers.map(element =>
    <li>{element.name}</li>
  )


  return (
    <ul>{listUsers}</ul>

  )

}

export default App