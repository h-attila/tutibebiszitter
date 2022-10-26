import React, {Component} from 'react';



import Img1 from '../../images/babysitter_bg_1.jpg';
import Img2 from '../../images/babysitter_bg_2.jpg';
import Img3 from '../../images/babysitter_bg_3.jpg';
import Img4 from '../../images/babysitter_bg_4.jpg';
import Article from '../Article/Article';
import classes from './Features.scss';

class Features extends Component {


    render() {
        return (
            <section className={[classes.Features, "my-5 w-100"].join(' ')}>

                <h4 className="text-center mb-3">Miért érdemes bébiszitternek jelentkezni hozzánk?</h4>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 p-1">
                            <article className={classes.Features}>
                                <Article title='home-features'/>
                            </article>
                        </div>

                        <div className="col-md-6 p-0">

                            <div className="container h-100">
                                <div className="row h-100">
                                    <div className="col-lg-6 p-1">
                                        <div className={classes.Img} style={{backgroundImage: "url(" + Img1 + ")"}}></div>
                                    </div>
                                    <div className="col-lg-6 p-1 d-none d-md-block">
                                        <div className={classes.Img} style={{backgroundImage: "url(" + Img2 + ")"}}></div>
                                    </div>
                                    <div className="col-lg-6 p-1 d-none d-md-block">
                                        <div className={classes.Img} style={{backgroundImage: "url(" + Img3 + ")"}}></div>
                                    </div>
                                    <div className="col-lg-6 p-1 d-none d-lg-block">
                                        <div className={classes.Img} style={{backgroundImage: "url(" + Img4 + ")"}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="text-center mt-4">
                                <button type="button" className="btn purple-btn text-uppercase">
                                    jelentkezem bébiszitternek <i className="fa fa-arrow-circle-right ml-2"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Features;