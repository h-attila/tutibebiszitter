import React, {Component} from 'react';

import classes from './Home.scss';

import HomeSearch from '../../../components/HomeSearch/HomeSearch';
import Article from '../../../components/Article/Article';
import Testimonials from "../../../components/Testimonials/Testimonials";
import Features from "../../../components/Features/Features";
import Benefits from "../../../components/Benefits/Benefits";
import ParallaxBlock from "../../../components/ParallaxBlock/ParallaxBlock";
import NewMembers from '../../../components/NewMembers/NewMembers';

import MainPicture1 from '../../../images/bg_main_2.jpg';

class Home extends Component {
    render() {
        return (
            <section className="home-search">

                <div className="container-fluid">
                    <div className="row">
                        <HomeSearch/>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col my-5">
                            <article className={classes.Welcome}>
                                <Article title='home-welcome'/>
                            </article>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">

                    <div className="row">
                        <Testimonials testimonials={this.props.testimonials}/>
                    </div>

                    <div className="row">
                        <Features/>
                    </div>

                    <div className="row">
                        <Benefits/>
                    </div>

                    <div className="row">
                        <ParallaxBlock image={MainPicture1} strength="600"/>
                    </div>

                    <div className="row">
                        <NewMembers newMembers={this.props.newMembers}/>
                    </div>
                </div>

            </section>
        );
    }
}

export default Home;