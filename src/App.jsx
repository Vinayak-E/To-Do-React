import { useState } from 'react';
import { Pencil, Trash2, CheckCircle, Circle, Sun, Moon } from 'lucide-react';

function App() {
  const [toDos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [dark, setDark] = useState(false);

  const handleEdit = (id, text) => {
    setEditId(id);
    setInputValue(text);
  };

  const handleUpdate = () => {
    setTodos(toDos.map(todo => 
      todo.id === editId ? { ...todo, text: inputValue } : todo
    ));
    setEditId(null);
    setInputValue('');
  };

  return (
    <div className={`min-h-screen w-full p-8 transition-colors duration-200 ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-lg mx-auto shadow-lg rounded-lg px-6 py-6 transition-colors duration-200 ${
        dark ? 'bg-gray-800 shadow-gray-900' : 'bg-gradient-to-r from-gray-100 to-gray-200'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`${dark ? 'text-white' : 'text-gray-800'} text-3xl font-bold`}>
            To-Do App
          </h1>
          <button 
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              dark ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {dark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </div>
        
        <div className={`flex shadow-md rounded-xl overflow-hidden mb-6 ${dark ? 'bg-gray-700' : 'bg-white'}`}> 
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`outline-none w-full py-3 px-4 ${
              dark ? 'bg-gray-700 text-white placeholder-gray-400' : 'text-gray-700 placeholder-gray-400'
            }`}
            placeholder="Add Task" 
          />
          <button 
            className={`px-6 font-medium transition-colors duration-200 ${
              editId !== null 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            onClick={() => {
              if (editId !== null) {
                handleUpdate();
              } else if (inputValue.trim()) {
                setTodos([...toDos, { id: Date.now(), text: inputValue, status: false }]);
                setInputValue('');
              }
            }}
          > 
            {editId !== null ? 'UPDATE' : 'ADD'}
          </button>
        </div>

        <div className="space-y-3">
          {toDos.map((value) => {
            return (
              <div key={value.id} 
                className={`flex justify-between items-center p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ${
                  dark ? 'bg-gray-700 shadow-gray-900' : 'bg-white'
                }`}
              >
                <div className="flex items-center">
                  <span 
                    onClick={() => {
                      setTodos(toDos.map((obj) => {
                        if (value.id === obj.id) {
                          return { ...obj, status: !obj.status };
                        }
                        return obj;
                      }));
                    }}
                    className="cursor-pointer"
                  >
                    {value.status ? 
                      <CheckCircle className="text-green-500 h-6 w-6 transition-colors duration-200" /> : 
                      <Circle className={`h-6 w-6 transition-colors duration-200 ${
                        dark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                      }`} />
                    }
                  </span>
                  <h3 className={`ml-3 ${
                    value.status 
                      ? 'line-through text-gray-400' 
                      : dark ? 'text-white' : 'text-gray-700'
                  }`}>
                    {value.text}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    className={`p-2 rounded-lg text-blue-500 transition-colors duration-200 ${
                      dark ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleEdit(value.id, value.text)}
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button 
                    className={`p-2 rounded-lg text-red-500 transition-colors duration-200 ${
                      dark ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setTodos(toDos.filter((obj) => obj.id !== value.id))}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
          {toDos.length === 0 && (
            <div className="text-center py-6">
              <p className={dark ? 'text-gray-400' : 'text-gray-500'}>
                No todos yet. Add one to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;