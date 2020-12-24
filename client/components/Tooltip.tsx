import React from 'react'
import { Tooltip as TooltipComponent } from 'react-bootstrap'

const Tooltip = (props: any) => {
  return (
      <TooltipComponent id="button-tooltip" {...props}>
          kokos
      </TooltipComponent>
  )
}

export default Tooltip
