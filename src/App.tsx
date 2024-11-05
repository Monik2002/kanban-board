import { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import './App.css';
import List from './Components/List/List';
import Navbar from './Components/Navbar/Navbar';
import CardProfile from './Components/CardProfile/CardProfile';

interface User {
  id: number;
  name: string;
  available: boolean;
}

interface Ticket {
  id: number;
  title: string;
  tag: string[];
  status: string;
  priority: number;
  userId: number;
  userObj: {
    name: string;
    available: boolean;
  };
}

interface Priority {
  name: string;
  priority: number;
}

function App() {
  const getStateFromLocalStorage = (): string | null => {
    const storedState = localStorage.getItem('groupValue');
    return storedState ? JSON.parse(storedState) : null;
  };

  const [groupValue, setGroupValue] = useState<string>(getStateFromLocalStorage() || 'status');
  const [orderValue, setOrderValue] = useState<string>('title');
  const [ticketDetails, setTicketDetails] = useState<Ticket[]>([]);

  const saveStateToLocalStorage = (state: string) => {
    localStorage.setItem('groupValue', JSON.stringify(state));
  };

  const orderDataByValue = useCallback((cardsArray: Ticket[]) => {
    const sortedArray = [...cardsArray];
    if (orderValue === 'priority') {
      sortedArray.sort((a, b) => b.priority - a.priority);
    } else if (orderValue === 'title') {
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
    }
    setTicketDetails(sortedArray);
  }, [orderValue]);

  useEffect(() => {
    saveStateToLocalStorage(groupValue);

    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        refactorData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const refactorData = (data: { tickets: Ticket[], users: User[] }) => {
      const ticketArray: Ticket[] = data.tickets.map((ticket) => ({
        ...ticket,
        userObj: data.users.find((user) => user.id === ticket.userId) || { name: 'Unknown', available: false },
      }));
      setTicketDetails(ticketArray);
      orderDataByValue(ticketArray);
    };

    fetchData();
  }, [groupValue, orderDataByValue]);

  const statusList = useMemo(() => ['In progress', 'Backlog', 'Todo', 'Done', 'Cancelled'], []);
  const userList = useMemo(() => ['Anoop Sharma', 'Yogesh', 'Shankar Kumar', 'Ramesh', 'Suresh'], []);

  const priorityList: Priority[] = useMemo(() => [
    { name: 'No priority', priority: 0 },
    { name: 'Low', priority: 1 },
    { name: 'Medium', priority: 2 },
    { name: 'High', priority: 3 },
    {name: 'Urgent', priority: 4},
  ], []);

  return (
    <>
      <Navbar
        groupValue={groupValue}
        orderValue={orderValue}
        handleGroupValue={setGroupValue}
        handleOrderValue={setOrderValue}
      />
      <section className="board-details">
        <div className="board-details-list">
          {groupValue === 'status' && statusList.map((listItem) => (
            <List
              key={listItem}
              groupValue='status'
              listTitle={listItem}
              ticketDetails={ticketDetails}
            />
          ))}
          {groupValue === 'user' && userList.map((listItem) => {
            const user = ticketDetails.find(ticket => ticket.userObj.name === listItem); // Find the corresponding user data

            return (
              <div key={listItem} className="user-card">
                <CardProfile name={listItem} available={user ? user.userObj.available : false} />
                <List
                  key={listItem}
                  groupValue='user'
                  listTitle={listItem}
                  ticketDetails={ticketDetails}
                />
              </div>
            );
          })}
          {groupValue === 'priority' && priorityList.map((listItem) => (
            <List
              key={listItem.priority}
              groupValue='priority'
              listTitle={listItem.name}
              ticketDetails={ticketDetails}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;

