import React from "react";

const testimonial = (props) => (
    <div className="testimonial p-3">
        <div className="avatar mx-auto mb-4">
            <img src={"/upload/testimonials/" + props.image}
                 className="rounded-circle img-fluid testimonial__img shadow"
                 alt={props.alt}
                 style={{'maxWidth': '150px'}} />
        </div>
        <p>
            <i className="fa fa-quote-left mr-2" />{props.text}
        </p>
        <h6 className="font-weight-bold">{props.title}</h6>
    </div>
);

export default testimonial;