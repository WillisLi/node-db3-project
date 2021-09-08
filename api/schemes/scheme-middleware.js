const Scheme = require('./scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const schemeId = req.params.scheme_id;
  Scheme.findById(schemeId)
    .then(exists => {
      if (!exists) {
        res.stats(404).json({message: `scheme with scheme_id ${schemeId} not found`})
      } else {
        req.scheme = exists;
        next()
      }
    })
    .catch(next)
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const scheme = req.body.scheme_name;
  if (scheme === undefined || scheme === '' || typeof scheme !== 'string') {
    next( {status: 400, message: `invalid scheme_name`} )
  } else {
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if (instructions === undefined || instructions === '' || typeof instructions !== 'string' || typeof step_number !== 'number' || step_number < 1) {
    next( {status: 400, message: `invalid step`} )
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
