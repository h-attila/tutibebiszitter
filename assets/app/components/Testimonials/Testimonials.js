import React, {Component} from "react";

import Testimonial from './Testimonial/Testimonial';
import classes from './Testimonials.scss';


class Testimonials extends Component {
    render() {
        let testimonials = null;
        if (this.props.testimonials) {
            testimonials = this.props.testimonials.map((testimonial) => {
                return (
                    <div className="col-lg-4" key={testimonial.id}>
                        <Testimonial title={testimonial.name} text={testimonial.description} alt={testimonial.name} image={testimonial.avatar} label={testimonial.label} />
                    </div>);
            });
        }

        return (
            <section className={classes.Testimonials}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="text-center my-5">
                                <h4 className="text-center">Bébiszitter partnereink mondták</h4>

                                <div className="row">

                                    {testimonials}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Testimonials;