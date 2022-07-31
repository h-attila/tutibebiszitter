import React from "react";

import classes from './Benefits.scss';
import bgArt from "../../images/bg_art.jpg";

const benefits = () => {
    return (
        <section className={classes.Benefits} style={{backgroundImage: "url(" + bgArt + ")"}}>
            <div className="container">
                <div className="row">

                    <div className="col-md-4 text-center mt-2 d-flex align-items-stretch">
                        <div className="card">
                            <i className="fa fa-thumbs-up fa-3x mt-3"></i>
                            <div className="card-body">
                                <h4 className="card-title"><strong>Első ok</strong></h4>
                                <p className="card-text text-center">Nagy gyakorlati tapasztalattal rendelkezünk az online hirdetések terén, és
                                    hogy
                                    hogyan lehet a találati listák élére kerülni és ott is maradni.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 text-center mt-2 d-flex align-items-stretch">
                        <div className="card">
                            <i className="fa fa-book fa-3x text-center mt-3"></i>
                            <div className="card-body">
                                <h4 className="card-title"><strong>Második ok</strong></h4>
                                <p className="card-text text-center">Tudjuk, hogy egy hirdetés mitől működik igazán, és ezt meg is osztjuk
                                    Veled.</p></div>
                        </div>
                    </div>
                    <div className="col-md-4 text-center mt-2 d-flex align-items-stretch">
                        <div className="card"><i className="fa fa-comments fa-3x text-center mt-3"></i>
                            <div className="card-body">
                                <h4 className="card-title"><strong>Harmadik ok</strong></h4>
                                <p className="card-text text-center">Bekerülsz egy többféle szempont szerint szűrhető TUTI adatbázisba, ahol az
                                    érdeklődők könnyen Rád találnak.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default benefits;