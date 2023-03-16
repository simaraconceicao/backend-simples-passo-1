const express = require('express')
const router = express.Router()
const nomes = require('./database.json')

const app = express()
const PORT = 3333

app.use(express.json())


// const nomes = [
//   { 
//     id: '1',
//     nome: 'Marielle Franco' 
//   },
//   { 
//     id: '2',
//     nome: 'Lélia Gonzalez' 
//   },
//   { 
//     id: '3',
//     nome: 'Angela Davis' 
//   }
// ]

const listaNomes = router.get('/', (req, res) => {
  res.json({ "data": nomes })
})

const criaNome = router.post('/', (req, res) => {
  
  const novoNome = {
    id: req.body.id,
    nome: req.body.nome
  }

  const nomesAtualizados = [...nomes, novoNome]

  res.json(nomesAtualizados)
})

const atualizaNome = router.patch('/:id', (req, res) => {
  let encontraNome = nomes.find(item => item.id == req.params.id)

  encontraNome.nome = req.body.nome

  res.json(nomes)
})

const deletaNome = router.delete('/:id', (req, res) => {
  const listaAtualizada = nomes.filter(item => item.id !== req.params.id)
  res.json(listaAtualizada)
})

app.use(listaNomes)
app.use(criaNome)
app.use(atualizaNome)
app.use(deletaNome)

app.listen(PORT, console.log(`Server is starting at ${PORT}`))
