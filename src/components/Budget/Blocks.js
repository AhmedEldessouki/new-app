import * as React from 'react'

import Block from './Block'

function Blocks({value = [], nameC = '', dispatchB}) {
  return (
    <div style={{width: '45%'}}>
      <h2
        style={{
          borderBottom: '12px solid indigo',
          textAlign: 'center',
          borderRadius: 10,
          marginTop: '9px',
          marginBottom: 0,
        }}
      >
        {nameC.toLocaleUpperCase()}
      </h2>
      {value?.map(({name, value, id}, i) => {
        return (
          <div
            key={id}
            style={{
              borderBottom:
                nameC === 'income' ? '3px solid #019a01' : '3px solid red',
            }}
          >
            <Block
              name={name}
              value={value}
              handleClick={() =>
                dispatchB({type: `remove_${nameC}`, payload: i})
              }
            />
          </div>
        )
      })}
    </div>
  )
}

export default Blocks
