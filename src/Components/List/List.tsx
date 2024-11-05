import React from 'react';
import './List.css';
import Card from '../Card/Card';
import AddIcon from '../../Assets/Images/Add.svg';
import threedotIcon from '../../Assets/Images/3 dot menu.svg';
import inProgressIcon from '../../Assets/Images/in-progress.svg';
import doneIcon from '../../Assets/Images/Done.svg';
import todoIcon from '../../Assets/Images/To-do.svg';
import cancelIcon from '../../Assets/Images/Cancelled.svg';
import backlogIcon from '../../Assets/Images/Backlog.svg';
import highpriorityIcon from '../../Assets/Images/Img - High priority.svg';
import mediumpriorityIcon from '../../Assets/Images/Img - Medium priority.svg';
import lowpriorityIcon from '../../Assets/Images/Img - Low priority.svg';
import nopriorityIcon from '../../Assets/Images/No-priority.svg';
import urgentprioritygreyIcon from '../../Assets/Images/SVG - Urgent Priority grey.svg';

interface CardDetails {
  id: number;
  title: string;
  tag: string[];
  priority: number;
  status: string;
  userObj: {
    name: string;
    available: boolean;
    profilePic?: string;
  };
}

interface ListProps {
  listTitle: string;
  groupValue: 'status' | 'user' | 'priority';
  ticketDetails: CardDetails[];
  priorityList?: { priority: string; name: string }[];
}

const List: React.FC<ListProps> = (props) => {
  let cardCount = 0;
  const filteredTickets = props.ticketDetails.filter((ticket) => {
    const match =
      ticket.status === props.listTitle ||
      String(ticket.priority) === props.listTitle ||
      ticket.userObj.name === props.listTitle;
    
    if (match) {
      cardCount++;
    }
    return match;
  });

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="list-header-left">
          {{
            'status': (
              {
                'Backlog': <div className="list-icon"><img src={backlogIcon} alt="Backlog" /></div>,
                'Todo': <div className="list-icon"><img src={todoIcon} alt="Todo" /></div>,
                'In progress': <div className="list-icon"><img src={inProgressIcon} alt="In Progress" /></div>,
                'Done': <div className="list-icon"><img src={doneIcon} alt="Done" /></div>,
                'Cancelled': <div className="list-icon"><img src={cancelIcon} alt="Cancelled" /></div>,
              }[props.listTitle] || null
            ),
            'user': <></>,
            'priority': (
              {
                0: <div className="card-tag-icon"><img src={nopriorityIcon} alt="No Priority" /></div>,
                1: <div className="card-tag-icon"><img src={lowpriorityIcon} alt="Low Priority" /></div>,
                2: <div className="card-tag-icon"><img src={mediumpriorityIcon} alt="Medium Priority" /></div>,
                3: <div className="card-tag-icon"><img src={highpriorityIcon} alt="High Priority" /></div>,
                4: <div className="card-tag-icon"><img src={urgentprioritygreyIcon} alt="Urgent Priority grey" /></div>,
              }[Number(props.listTitle)] || null
            ),
          }[props.groupValue]}

          <div className="list-title">
            {{
              'priority': props.priorityList
                ? props.priorityList.map((priorityProperty) =>
                    priorityProperty.priority === props.listTitle ? (
                      <>{priorityProperty.name}</>
                    ) : null
                  )
                : null,
              'status': <>{props.listTitle}</>,
              'user': <>{props.listTitle}</>,
            }[props.groupValue]}
          </div>
          <div className="list-sum">{cardCount}</div>
        </div>
        <div className="list-header-right">
          <div className="list-add-item">
            <img src={AddIcon} alt="Add Item" />
          </div>
          <div className="list-option-item">
            <img src={threedotIcon} alt="Options" />
          </div>
        </div>
      </div>

      <div className="list-card-items">
        {filteredTickets.map((ticket) => (
          <Card
            key={ticket.id}
            cardDetails={ticket}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
