import React from 'react'

interface FieldsetLayoutProps {
    fieldsetStyle : Object;
    legendStyle : Object;
    legendContent : string;
    labels : JSX.Element[];
}

const FieldsetLayout:React.FC<FieldsetLayoutProps> = ({fieldsetStyle, legendStyle, legendContent, labels}) => {

  return (
    <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>{legendContent}</legend>
        {labels}
    </fieldset>
  )
}

export default FieldsetLayout