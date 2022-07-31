import React, {Component} from 'react';

import * as actionCreators from "../../../store/actions/actions";

import Aux from '../../../hoc/Aux';
import Article from '../../../components/Article/Article';
import Button from '../../../components/UI/Button/Button';

import Testimonials from '../../../components/Testimonials/Testimonials';
import Prices from '../../../components/Prices/Prices';
import {connect} from "react-redux";
import CheckIcon from '@material-ui/icons/Check';

import classes from './BabysitterInfo.scss';

class BabysitterInfo extends Component {
    render() {
        return (
            <Aux>
                <section className="babysitter-info-page mt-3">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <article>

                                    <h1 className="text-center mt-5 mb-3">Bébiszitter vagyok</h1>

                                    <h2 className="text-center mt-3">Miért érdemes regisztrálnod a <a href="http://tutibebiszitter.hu"
                                                                                                      target="_blank">www.tutibebiszitter.hu</a> oldalon ?</h2>
                                    <div className="container mt-4">
                                        <p>Amennyiben megtisztelsz bennünket jelentkezéseddel, a következő előnyöket tudjuk Számodra biztosítani:</p>
                                        <ul className="list-unstyled">
                                            <li><CheckIcon className="mr-2"/>Egy egyszerű és gyors regisztrációval bekerülsz
                                                adatbázisunkba, így adatlapod megjelenik a <a
                                                    href="http://tutibebiszitter.hu" target="_blank">www.tutibebiszitter.hu</a> oldalon, ahol a saját profilodat
                                                bármikor tudod szerkeszteni.
                                            </li>
                                            <li><CheckIcon className="mr-2"/>Az ügyintézés gyors és rugalmas.</li>
                                            <li><CheckIcon className="mr-2"/>Képeket, szülők ajánlását tölthetsz fel saját oldaladra
                                                magadról, ami segít felépíteni a szülőkben az első
                                                bizalmat.
                                            </li>
                                            <li><CheckIcon className="mr-2"/>Személyre szabottan segítünk Neked az igazán hatékony
                                                hirdetés megírásában, amennyiben erre igényt tartasz és
                                                kéred a
                                                segítségünket.
                                            </li>
                                            <li><CheckIcon className="mr-2"/>A szülők teljesen díjmentesen többféle szempont szerint
                                                szűrhetnek és kereshetnek adatbázisunkban, hogy Rád
                                                találjanak,
                                                amikor gyermekfelügyeletre van szükségük - akár alkalmilag, vagy huzamosabb időtartamra.
                                            </li>
                                            <li><CheckIcon className="mr-2"/>A kereső szülők közvetlenül Veled veszik fel a
                                                kapcsolatot – személyesen egyeztetsz velük mindenről, nincs
                                                korlátozva a
                                                megkeresések száma.
                                            </li>
                                            <li><CheckIcon className="mr-2"/>Kiemelt figyelmet fordítunk az interneten történő
                                                folyamatos jelenlétre, és ebben segít minket a 15 éves
                                                megszerzett
                                                gyakorlati tapasztalatunk, valamint abban, hogy hogyan kerüljünk az online találati listák élére, és hogyan is
                                                maradjuk
                                                ott.
                                            </li>
                                            <li><CheckIcon className="mr-2"/>Tudjuk, hogy egy hirdetés mitől működik igazán, és ezt
                                                meg is osztjuk Veled.
                                            </li>
                                        </ul>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">

                            <article className="testimonials w-100">
                                <div className="text-center my-5">
                                    <Testimonials testimonials={this.props.testimonials}/>
                                </div>
                            </article>

                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h4 className="text-center mt-3">Regisztrációs díjak</h4>

                                <p className="text-center mt-2">Az adatbázisába történő jelentkezés egyszeri regisztrációs díj megfizetésével vehető igénybe
                                    adott
                                    időszakra:</p>
                            </div>
                        </div>

                        <Prices/>

                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="mt-3 text-justify">Jelentkezéshez kattints a lenti gombra, majd néhány adat megadása után el is készítjük a
                                    személyes profil oldalad,
                                    melyet a
                                    továbbiakban bármikor tudsz szerkeszteni a jobb felső sarokban található <strong>Belépés</strong> gombra kattintva.
                                    A
                                    regisztrációs díj beérkezését követően aktiváljuk a hirdetésedet.</p>

                                <h4 className="mt-2 mb-2 text-center">Jelentkezz most!</h4>
                                <div className="text-center">
                                    <div className="text-center mt-4">

                                        <Button click={() => this.props.onClick('jelentkezem-bebiszitternek')} title='jelentkezem bébiszitternek'
                                                icon='fa-arrow-circle-right' class='text-uppercase'/>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div className="row">
                            <div className="col">
                                <article>
                                    <h2 className="text-center">Profil előrehelyezése / kiemelése</h2>
                                    <p>Regisztrált partnereink számára előrehelyezési, kiemelési lehetőséget is biztosítunk. Erre azért lehet szükség, mert ha
                                        felkerül egy új jelentkező a weboldalra, a találati listán legelső helyen jelenik meg az adatlapja, majd ahogy az újabb
                                        profilok létesülnek, úgy kerül egyre lejjebb a hirdetése. Nyilvánvalóan aki elöl szerepel, sokkal több megkeresést
                                        kaphat,
                                        mint akik a találati lista végén találhatók.
                                    </p>
                                    <p>
                                        Nagyon megéri élni a kiemelés lehetőségével, hiszen már egy új megbízás esetén is többszörösen megtérül az ára.
                                    </p>
                                    <p>
                                        A kiemeléssel adataid a találati lista legelejére kerülnek, mintha frissen jelentkeztél volna be. Így megelőzheted az
                                        összes
                                        többi hirdetőt. Hirdetésed ebben az esetben kiemelten (rózsaszín háttérrel) jelenik meg a listán.
                                    </p>
                                    <div className="row d-flex justify-content-center mb-3">
                                        <div className={[classes.LightPurple, "card col-sm-8 col-md-6 col-lg-4"].join(' ')}>
                                            <div className="card-body">
                                                <p className="card-text text-white text-center pb-0">A kiemelés díja egy hétre: <strong>2.000
                                                    Ft.</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                    <p>
                                        A kiemelés díját az <strong>IQ-Help Kft.</strong> bankszámlaszámára tudod átutalni: OTP Bank,
                                        <strong>11705998-21300154</strong>.
                                        Kérjük, hogy utaláskor tüntesd fel a <strong>neved a közlemény rovatban</strong>, valamint azt, hogy <a
                                        href="http://tutibebiszitter.hu" target="_blank">www.tutibebiszitter.hu</a>.
                                    </p>
                                </article>
                            </div>
                        </div>

                        <hr/>

                        <div className="row">
                            <div className="col">
                                <article>
                                    <div className="mt-3">

                                        <div className="mt-3"><h2 className="text-center">Ajánlás</h2>
                                            <p className="text-justify"><i>’Ajánlj minket’ akciónk keretében</i> – ha regisztrált tag vagy – és hozol egy új
                                                jelentkezőt
                                                az oldalra, aki szintén
                                                regisztrál és befizeti a regisztrációs díjat, további ingyenes hónapokat biztosítunk Számodra.
                                            </p>
                                            <ul className="list-unstyled">
                                                <li>
                                                    <CheckIcon className="mr-2"/>Ha 3 hónapra regisztrál az ismerősöd, <strong>+1
                                                    hónap</strong>
                                                    ingyenes
                                                    tagságot adunk Neked.
                                                </li>
                                                <li>
                                                    <CheckIcon className="mr-2"/>Ha 6 hónapra regisztrál az ismerősöd, <strong>+2
                                                    hónap</strong>
                                                    ingyenes
                                                    tagságot adunk Neked.
                                                </li>
                                                <li>
                                                    <CheckIcon className="mr-2"/>Ha 12 hónapra regisztrál az ismerősöd, <strong>+3
                                                    hónap</strong>
                                                    ingyenes
                                                    tagságot adunk Neked.
                                                </li>
                                                <li><CheckIcon className="mr-2"/>Ha örökös tagságot választ az
                                                    ismerősöd, <strong>+12 hónap</strong> ingyenes tagságot adunk Neked.<br/>
                                                </li>

                                                <p className="mt-2 text-justify">Fontos, hogy az ismerősöd – aki regisztrál – a regisztrációs adatlapon a
                                                    „honnan
                                                    hallottál rólunk” kérdésre írja
                                                    be a Te nevedet, így fogjuk tudni, hogy Te ajánlottad neki a weboldalunkat.</p>
                                            </ul>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: (ref) => dispatch(actionCreators.buttonClick(ref))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BabysitterInfo);