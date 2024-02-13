import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import ChannelBrowser from './components/ChannelBrowser';
import WhiteListedVideos from './components/WhiteListedVideos';
import ChannelList from './components/ChannelList';
import ChannelView from './components/ChannelView';
import Banner from './components/Banner';


function App() {
  return (
    <Router>
      <Banner/>
      <Routes>
        <Route path='/' element={<ChannelBrowser/>}></Route>
        <Route path='/videos' element={<WhiteListedVideos/>}></Route>
        <Route path='/channels' element={<ChannelList/>}></Route>
        <Route path='/channels/:channelId' element={<ChannelView/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
