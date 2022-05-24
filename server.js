const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const User = require('./User.js')
const Project = require('./Projects.js')
const Task = require('./Tasks.js')
const withAuth = require('./middleware')
const Projects = require('./Projects.js')
const app = express()

const port = process.env.PORT || 5000

app.use(cookieParser())
app.use(express.json())

const mongo_uri = 'mongodb+srv://ameerpc9676:iseeuapc@test1.mifbw.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongo_uri, function(err) {
    if (err) {
      throw err
    } else {
      console.log(`Successfully connected to ${mongo_uri}`)
    }
})

const secret = 'myKey'

app.get('/api/secret', withAuth, function(req, res) {
    res.send(req.username)
})

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200)
})

// POST route to register a user
app.post('/api/register', function(req, res) {
    const { username, password } = req.body
    const user = new User({ username, password })
    user.save(function(err) {
        if (err) {
        res.status(500)
            .send("Error registering new user please try again.")
        } else {
        res.status(200).send("Welcome to the club!")
        }
    })
})

// POST route to authenticate a user
app.post('/api/authenticate', function(req, res) {
    const { username, password } = req.body
      User.findOne({ username }, function(err, user) {
        if (err) {
          console.error(err);
          res.status(500)
            .json({
            error: 'Internal error please try again'
          });
        } else if (!user) {
          res.status(401)
            .json({
              error: 'Incorrect username or password'
            });
        } else {
          user.isCorrectPassword(password, function(err, same) {
            if (err) {
              res.status(500)
                .json({
                  error: 'Internal error please try again'
              });
            } else if (!same) {
              res.status(401)
                .json({
                  error: 'Incorrect email or password'
              });
            } else {
              // Issue token
              const payload = { username }
              const token = jwt.sign(payload, secret, {
                expiresIn: '1h'
              })
              res.cookie('token', token, { httpOnly: true })
              .sendStatus(200)
            }
          })
        }
    })
})

// POST route to signout a user
app.get('/api/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, path: '/' })
        .sendStatus(200)
})

app.get('/api/users/getall', function(req, res) {
  User.find({ }, (err, docs) => {
    if(err) res.status(500)
    else if(!docs) res.send("no users exists")
    else {
      res.json(JSON.stringify(docs))
    }
  })
})


app.get('/api/project/:projectId/addMember/:username', function(req, res) {
  const projectId = req.params.projectId
  const username = req.params.username
  User.findOne({ username }, (err, docs) => {
    if(err) res.status(500)
    else if(!docs) res.send("no users exists")
    else {
      Project.findByIdAndUpdate(projectId, { "$push" : {"members": docs._id}}, (err, raw) => {
        if(err) res.status(500)
        else res.send(raw)
      })
    }
  })
})

app.get('/api/project/:projectId/getMembers', function(req, res) {
  const projectId = req.params.projectId
  Project.findById(projectId).select('members').exec( (err, docs) => {
    if(err) res.status(500)
    else if(!docs) res.send("no project exists")
    else {
        res.status(200)
      
    }
  })
})

// POST route to create a new project
app.post('/api/projects/add', withAuth, function(req, res) {
    const { projectName, projectDescription, owner, startDate, endDate } = req.body
    const username = req.username
    User.findOne({ username }, (err, docs) => {
      if(err) res.status(500)
      else if(!docs) res.send('User document not exists')
      else {
        const project = new Project({
          projectName: projectName,
          projectDescription: projectDescription,
          owner: docs._id,
          startDate: startDate,
          endDate: endDate
        }).save()
        res.status(200)
      }
    })
})

// GET route to create a new project
app.get('/api/projects/get_all', withAuth, function(req, res) {
  const username = req.username
  User.findOne({ username }, (err, docs) => {
    if(err) res.status(500)
    else if(!docs) res.send('User document not exists')
    else {
      Project.find({owner: docs._id}, (err, docs) => {
        if(err) res.status(500)
        else if(!docs) res.send('Project documents collection not exists')
        else {
          res.json(JSON.stringify(docs))
        }
      })
    }
  })
})

// POST route to create a new task in a prject
app.post('/api/add/project/task', function(req, res) {
  const { taskname, projectname, username, employee } = req.body
  Projects.findOne({ projectName: projectname }, (err, docs) => {
    if(err) res.status(500)
    else if(!docs) res.send('Document not exists')
    else {
      const task = new Tasks({
        taskName: taskname,
        projectName: docs._id,
      }).save()
      res.status(200)
    }
  })
})

// POST route to get all projects
app.post('/api/get/projects', function(req, res) {
  const { username } = req.body
  User.findOne({ username }, (err, docs) => {
    if(err) res.status(500)
    else if(!docs) res.send('Document not exists')
    else {
      Project.find({owner: docs._id}, (err, docs) => {
        if(err) res.status(500)
        else if(!docs) res.send('no projects exist')
        else {
          res.json(JSON.stringify(docs))
        }
      })
    }
  })
})

//port
app.listen(port, () => console.log(`Listening on port ${port}`))
