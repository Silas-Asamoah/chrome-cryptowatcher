"use strict";

const cryptos = require('./cryptos.json')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const helpers = require('./helpers')
const config = require('./config')
const express = require('express')
const bcrypt = require('bcrypt')
const DB = require('./db')


const db = new DB("sqlitedb")
const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());