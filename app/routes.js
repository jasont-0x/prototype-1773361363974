const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/applicant-type', function (req, res) {
  res.render('applicant-type')
})

router.post('/applicant-type', function (req, res) {
  const answer = req.session.data['applicant-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'applicant-type': 'Select who this application is for' }
    return res.render('applicant-type')
  }
  res.redirect('/has-qualifying-disability')
})

router.get('/has-qualifying-disability', function (req, res) {
  res.render('has-qualifying-disability')
})

router.post('/has-qualifying-disability', function (req, res) {
  const answer = req.session.data['has-qualifying-disability']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'has-qualifying-disability': 'Select yes if you have a qualifying disability' }
    return res.render('has-qualifying-disability')
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-has-qualifying-disability')
  }
  res.redirect('/full-name')
})

router.get('/ineligible-has-qualifying-disability', function (req, res) {
  res.render('ineligible-has-qualifying-disability')
})

router.get('/full-name', function (req, res) {
  res.render('full-name')
})

router.post('/full-name', function (req, res) {
  const answer = req.session.data['full-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'full-name': 'Enter your full name' }
    return res.render('full-name')
  }
  res.redirect('/address')
})

router.get('/address', function (req, res) {
  res.render('address')
})

router.post('/address', function (req, res) {
  const answer = req.session.data['address']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'address': 'Enter your home address' }
    return res.render('address')
  }
  res.redirect('/disability-details')
})

router.get('/disability-details', function (req, res) {
  res.render('disability-details')
})

router.post('/disability-details', function (req, res) {
  const answer = req.session.data['disability-details']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'disability-details': 'Tell us about your disability and how it affects your mobility' }
    return res.render('disability-details')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('DPP')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
