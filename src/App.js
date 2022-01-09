import React, { Component, useState } from 'react';
import { hot } from 'react-hot-loader'
import ReactPlayer from 'react-player'

import logo from './logo.svg';
import './App.css';
import "./assets/css/radio_player.css"

class RadioPlayerComponent extends Component {
  state = {
    url: 'https://rs.radio.uoc.gr:8001/uoc_128.mp3',
    playing: false,
    music_card_playing: { 'music_card': 'music-card', 'play_btn': 'play' },
  }

  ref = player => {
    this.player = player
  }

  play_btn = () => {
    /*if (sound.playState !== 0) {
        sound.stop();
        sound.unload();
    } else {
        sound.load();
        sound.play();

    }*/
    console.log('CLICKED')
    this.setState({ playing: !this.state.playing })
  }

  set_icon = (action) => {
    switch (action) {
      case -1://stopped
        this.setState({ music_card_playing: { 'music_card': 'music-card', 'play_btn': 'play' } });
        break;
      case 0://playing
        this.setState({ music_card_playing: { 'music_card': 'music-card playing', 'play_btn': 'pause' } });
        break;
      case 1://loading
        this.setState({ music_card_playing: { 'music_card': 'music-card', 'play_btn': 'loader' } });
        break;
      default:
        this.setState({ music_card_playing: { 'music_card': 'music-card', 'play_btn': 'play' } });
        break;
    }
  }

  handlePlayPause = () => {
    if (!this.state.playing) {
      console.log(this.player.getDuration())
      console.log(this.player.getSecondsLoaded())
      //this.player.seekTo(0.99, 'fraction')
      this.player.seekTo(this.player.getSecondsLoaded() - 1, 'seconds')
    }
    this.setState({ playing: !this.state.playing })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ music_card_playing: { 'music_card': 'music-card playing', 'play_btn': 'pause' } });
    //this.setState({ playing: true })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ music_card_playing: { 'music_card': 'music-card', 'play_btn': 'play' } });
    // this.setState({ playing: false })
  }

  handleStart = () => {
    this.setState({ music_card_playing: { 'music_card': 'music-card', 'play_btn': 'loader' } });
  }

  render() {
    const { url, playing, music_card_playing } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <div className='radio_player z99'>
            <div className={music_card_playing.music_card}>
              <div id='cover' className='image' />
              <div className='radio_info'>
                <h2 className='radio_title'>&nbsp;</h2>
                <div className='radio_artist' />
                <div className="radio_album" />
              </div>
              <div className='wave' />
              <div className='wave' />
              <div className='wave' />
            </div>
            <div id="play_btn">
              <div id="player_icon" onClick={this.handlePlayPause} className={music_card_playing.play_btn} />
            </div>
            <h2 className="presentation-subtitle text-center"></h2>
            <ReactPlayer
              ref={this.ref}
              url={url}
              playing={playing}
              onReady={() => console.log('onReady')}
              onStart={this.handleStart}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              onBuffer={() => console.log('onBuffer')}
              controls={true}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default hot(module)(RadioPlayerComponent)
