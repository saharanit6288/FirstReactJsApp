import React, { Component } from 'react';

class Carousel extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            images: [
                {url: 'https://fv20.failiem.lv/thumb_show.php?i=nhe8gm4s', title: 'First Slide', description: 'This is a description for the first slide.'},
                {url: 'https://fv20.failiem.lv/thumb_show.php?i=zeb7k29u&v', title: 'Second Slide', description: 'This is a description for the second slide.'},
                {url: 'https://fv20.failiem.lv/thumb_show.php?i=97abt76d', title: 'Third Slide', description: 'This is a description for the third slide.'},
            ]
        };
    }
    

    render() {
      return (
        <header>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                {
                    this.state.images.map(function(img, i){
                        return <li key={i} data-target="#carouselExampleIndicators" data-slide-to={i} className={i===0?'active':''}></li>
                    })
                }
                
                </ol>
                <div class="carousel-inner" role="listbox">
                {
                    this.state.images.map(function(img, i){
                        return (
                            <div key={i} className={"carousel-item " + (i===0?'active':'')} style={ { backgroundImage: `url(${img.url})` } }>
                                <div class="carousel-caption d-none d-md-block">
                                <h3>{img.title}</h3>
                                <p>{img.description}</p>
                                </div>
                            </div>
                        )
                    })
                    
                }
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
                </a>
            </div>
        </header>       
      );
    }
}

export default Carousel;