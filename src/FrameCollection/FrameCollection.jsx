import Frame from "../Frame/Frame";
import images from "../images";
import { useState } from "react";
import "./styles.css";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function FrameCollection(props) {
  const [imageList, setimageList] = useState(images);

  const render = _.orderBy(imageList, "position").map((element) => (
    <div className="collection">
      <Draggable
        draggableId={element.id.toString()}
        index={element.position}
        key={element.id}
      >
        {(provided) => (
          <div
            className="wraper"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Frame
              key={element.id}
              position={element.position}
              true={element.true}
              link={element.url}
            />

            <div className="number">{element.position}</div>
          </div>
        )}
      </Draggable>
    </div>
  ));

  const onDragEnd = (rslt) => {
    const { source, destination } = rslt;
    const src_index = source.index;
    const dest_index = destination.index;
    var direction;
    var range;

    if (src_index === dest_index) {
      return;
    }
    if (src_index > dest_index) {
      direction = "ILLOGICAL";
      range = _.range(dest_index, src_index);
    } else {
      direction = "LOGICAL";
      range = _.range(src_index + 1, dest_index + 1);
    }
    const reordered = imageList.map((e) => {
      if (range.includes(e.position)) {
        if (direction === "LOGICAL") {
          e.position = e.position - 1;
        } else {
          e.position = e.position + 1;
        }
        return e;
      }
      if (e.position === src_index) {
        e.position = dest_index;
      }

      return e;
    });
    setimageList(reordered);
    for (var element of reordered) {
      if (element.true !== element.position) {
        props.setfinished(false);
        return;
      }
    }
    props.setfinished(true);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="IMAGES">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {render}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default FrameCollection;
