import React from 'react';
import {Parallax} from 'react-parallax';

const parallaxBlock = (props) => (
    <section>
        <Parallax bgImage={props.image} bgImageStyle={{height: 'auto', Width: '100vw'}} style={{height: '600px', width: '100vw'}} strength={props.strength}/>
    </section>
)

export default parallaxBlock;