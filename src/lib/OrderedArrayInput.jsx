import React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const ListItem = styled.div`
  padding: 8px;
  margin: 8px;
  border: 1px solid grey;
  background-color: ${props => props.isDragging ? 'lightgrey': 'white'}
`

const List = styled.div`
  padding: 8px;
  border: 1px solid grey;
  background-color: ${props => props.isDraggingOver ? '#2097F3': 'white'}
`

const Title = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  padding: 8px;
`


const OrderedArrayInput = (props) => {
  const { id, choices, input } = props;
  const { value: values} = input

  const children = React.cloneElement(props.children, props)

  const selectedChoices = values.map(v => choices.find(c => c.id === v))

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination || (destination.index === source.index)) return ;

    const newValues = Array.from(values)
    newValues.splice(source.index, 1);
    newValues.splice(destination.index, 0, draggableId)

    input.onChange(newValues)
  }

  console.log(selectedChoices)
  return (
    <div>
      {children}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <List
              component='nav'
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
              {...provided.droppableProps}>

              <Title>Order</Title>

              {selectedChoices.map(
                (v, i) => <ChoiceItem value={v} index={i} key={v.id} />
              )}

              {provided.placeholder}
            </List>
          )}

        </Droppable>
      </DragDropContext>
    </div>
  )
}


const ChoiceItem = (props) => {
  const { value, index } = props;
  return (
    <Draggable draggableId={value.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          [<i>#{value.id}</i>] <b>{value.title}</b>
        </ListItem>
      )}
    </Draggable>
  )
}

export default OrderedArrayInput;