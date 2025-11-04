// 🚀 LUỒNG ĐI CỦA ỨNG DỤNG REACT

// 📦 BƯỚC 1: Import các dependencies cần thiết
import React from 'react';           // Thư viện React chính
import './App.css';                  // Styles cho App component

// Import các components khác
import Home from './pages/Home';     // Component Home page (modern structure)

// Import TaskManager App - the main application
import TaskManagerApp from './lessons/core-hooks-exercise'; // ← Component TaskManagerApp (core hooks exercise)

import WeatherApp from './lessons/weather-app-exercise/WeatherApp'; // ← Component WeatherApp (weather app exercise)

// 🧩 BƯỚC 2: Định nghĩa App component (Component gốc của ứng dụng)
function App() {
  // 🔄 BƯỚC 3: Logic điều khiển hiển thị
  // const showNewStructure = false;  // Flag để switch giữa lessons và modern structure

  // // 🎯 Điều kiện render: Nếu showNewStructure = true → hiển thị Home page
  // if (showNewStructure) {
  //   return <Home />;  // Render Home component và kết thúc function
  // }

  // 🎨 BƯỚC 4: Render giao diện chính (khi showNewStructure = false)
  return (
    <div className="App">  {/* Container chính của ứng dụng */}

      {/* 📚 Các bài học cũ được comment để tham khảo */}
      {/* 
      <section>
        <ColorBox color="red" />
        <ColorBox color="green" rounded={false} />
        <ColorBox color="blue" rounded={true} />
        <ColorBox color="purple" />
      </section>
      */}

      {/* 
      <h1>📅 Day 2: Render Elements</h1>
      <p>Xin chào {RenderElement.info.name}!</p>
      <RenderElement />
      */}


      {/*
      <h1>📅 Day 3: Todo List</h1>
      <TodoList todos={[
        { id: 1, title: 'Ăn sáng' },
        { id: 2, title: 'Đi học' },
        { id: 3, title: 'Đi làm' }
      ]} />
      */}

      {/*
      <h1>📅 Day 4: Album List</h1>
      <AlbumFeature />
      */}

      {/*
      <h1>📅 Day 5: state</h1>
      <Counter />
      */}

      {/*
      <h1>📅 Day 6: Todo List</h1>
      <TodoFeature />
      */}

      {/*
      <ProductList />
      */}

      {/* <TaskManagerApp /> */}

      <WeatherApp />
    </div>
  );
}

export default App;
