import React, {Component} from 'react';


import Article from '../../../components/Article/Article';
import Benefits from "../../../components/Benefits/Benefits";
import Features from "../../../components/Features/Features";
import HomeSearch from '../../../components/HomeSearch/HomeSearch';
import NewMembers from '../../../components/NewMembers/NewMembers';
import ParallaxBlock from "../../../components/ParallaxBlock/ParallaxBlock";
import Testimonials from "../../../components/Testimonials/Testimonials";
import MainPicture1 from '../../../images/bg_main_2.jpg';
import classes from './Home.scss';

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