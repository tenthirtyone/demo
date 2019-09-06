import React from 'react';
import DragSortableList from 'react-drag-sortable'

const ChipArea = ({ data, makeTree }) => {
  function test(sortedList, event) {
    const newData = sortedList.map(item => {
      return item.word
    });
    makeTree(newData)
  }

  return (
    <div className="container chip-area">

    <DragSortableList 
      items={data.map(word => {
        return {
          content: <div>{word}</div>,
          word: word,
          classes: ['chip']
        }
      })} onSort={test} dropBackTransitionDuration={0.3} type="horizontal"/>
  
    </div>
  )
}

export default ChipArea;