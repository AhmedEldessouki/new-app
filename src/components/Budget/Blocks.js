import * as React from 'react'
import Confirmation from '../utils/Confirmation'

function Blocks({value = [], nameC = '', dispatchB}) {
  return (
    <div style={{width: '45%'}}>
      <h2
        style={{
          borderBottom: '12px solid indigo',
          textAlign: 'center',
          borderRadius: 10,
        }}
      >
        {nameC.toLocaleUpperCase()}
      </h2>
      {value?.map(({name, value, id}, i) => {
        return (
          <>
            <div
              key={id}
              style={{
                display: 'flex',
                placeContent: 'space-between',
                placeItems: 'center',
                padding: '10px',
                minWidth: '90%',
                borderBottom: `3px solid `,
                borderColor: nameC === 'income' ? '#019a01' : 'red',
              }}
            >
              <div>{name}</div>
              <div>{value}</div>
            </div>
            <Confirmation
              handleClick={() =>
                dispatchB({type: `remove_${nameC}`, payload: i})
              }
            />
          </>
        )
      })}
    </div>
  )
}

export default Blocks
