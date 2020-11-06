import React from 'react'

import { useStyles } from '../hooks/useStyles'

function About() {
  const classes = useStyles()

  return (
    <div className={classes.aboutContainer}>
      <h1>About</h1>
      <p>This is the school project of creating Library app.</p>
    </div>
  )
}

export default About
