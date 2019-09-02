import React from 'react';
import './Quotes.css';
import axios from 'axios';

const momentumAppLink = "https://www.momentumdash.netlify.com";

class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      isHovering: false
    };
    this.handleFacebookClick = this.handleFacebookClick.bind(this);
    this.handleRedditClick = this.handleRedditClick.bind(this);
    this.handleTumblrClick = this.handleTumblrClick.bind(this);
    this.handleTweetClick = this.handleTweetClick.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote = () => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
      )
      .then(response => {
        this.setState({
          quote: response.data.quoteText,
          author: response.data.quoteAuthor
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFacebookClick() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=valentinacalabrese.com&quote=${
        this.state.quote
      }${this.state.author}`
    );
  }

  handleRedditClick() {
    window.open(
      `https://reddit.com/submit?url=${momentumAppLink}&title=${this.state.quote}${this.state.author}`
    );
  }

  handleTumblrClick() {
    window.open(
      `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${momentumAppLink}&title=${this.state.quote}&caption=${this.state.quote}${this.state.author}&tags=motivational,quotes,inspiration,quoteoftheday`
    )
  }

  handleTweetClick() {
    window.open(
      `https://twitter.com/intent/tweet?text="${this.state.quote} ${
        this.state.author
      }"`
    );
  }

  render() {
    const { quote, author } = this.state;

    const QuoteText = ({ quote, author }) => (
      <div>
        <p className="text-quote">{quote}</p>
        <p className="text-author-name">{author}</p>
      </div>
    );

    const Button = ({ onClick }) => <button className="refresh-btn animated rubberBand delay-2s" onClick={onClick}>
        <i className="fas fa-sync-alt" />
      </button>;

    const Social = () => (
      <div className="social">
      <button
          className="socialBtn"
          onClick={this.handleFacebookClick}
          target="_blank"
          href="#"
          rel="noopener noreferrer"
        >
        <i className="fab fa-facebook-square fa-2x" />
      </button>
      <button
          className="socialBtn"
          onClick={this.handleRedditClick}
          target="_blank"
          href="#"
          rel="noopener noreferrer"
        >
        <i className="fab fa-reddit fa-2x" />
      </button>
      <button
          className="socialBtn"
          onClick={this.handleTweetClick}
          target="_blank"
          href="#"
          rel="noopener noreferrer"
        >
        <i className="fab fa-twitter fa-2x" />
      </button>
      <button
          className="socialBtn"
          onClick={this.handleTumblrClick}
          target="_blank"
          href="#"
          rel="noopener noreferrer"
        >
        <i className="fab fa-tumblr fa-2x" />
      </button>
      
      </div>
    );

    return <div className="quoteContainer">
        <div className="quoteWrapper" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
          { (this.state.quote !== undefined && this.state.author!== undefined) ? (
            <QuoteText quote={quote} author={author} /> 
          ) : ( 
            <QuoteText quote={"Uhm, no quotes for now 🤔...Try again in a few secs"} author = {"Vale"}/>
          )}
          
          {
            this.state.isHovering &&
            <React.Fragment>
              <Button onClick={this.getQuote} />
              <Social />
            </React.Fragment>
          }
        </div>
      </div>;
  }
}

export default Quotes;