import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import './MovieList.scss'

export default class MovieList extends Component {
  static propTypes = {
    genres: React.PropTypes.array.isRequired,
    movies: React.PropTypes.array,
    showWatchListRemovalButton: React.PropTypes.bool,
    emitter: React.PropTypes.object
  }
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="me-movie-list">
        {this.props.movies.length === 0 && 'No movies added to your watchlist yet!'}
        {this.props.movies.map(m => {
          const average = Math.round(m.vote_average * 10) / 10
          return m.poster_path && <div className="me-movie" key={m.id}>
            <div className="me-movie__poster__score">{average}</div>
            <img onClick={() => {
              browserHistory.push(`/movie/${m.id}`)
            }} className="me-movie__poster" src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}/>
            <div className="me-movie__details">
              <div className="me-movie__details__title">
                <a onClick={() => {
                  browserHistory.push(`/movie/${m.id}`)
                }}>{m.title}</a>
              </div>
              <div className="me-movie__details__genres">
                {this.props.genres
                  .filter(g => m.genre_ids.indexOf(g.id) !== -1)
                  .map(g => g.name).join(', ')}
              </div>
            </div>
            {this.props.showWatchListRemovalButton && <button className={'me-button'} onClick={() => {
              this.props.emitter.emit('removeFromWatchList', m)
            }}>
              Remove from list
            </button> }
          </div>
        })}
      </div>
    )
  }
}
