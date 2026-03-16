const express = require("express")
const cors = require("cors")
const config = require("./config/env")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "API TaskFlow funcionando" })
})

app.listen(config.port, () => {
  console.log(`Servidor escuchando en puerto ${config.port}`)
})