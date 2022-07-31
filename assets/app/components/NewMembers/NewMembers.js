import React, {Component} from 'react';

import NewMember from './NewMember/NewMember';

class NewMembers extends Component {
    render() {
        let newMembers = null;
        if (this.props.newMembers) {
            newMembers = this.props.newMembers.map((member) => {
                return (
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" key={member.id}>
                        <NewMember {...member} />
                    </div>
                );
            });
        }
        return (
            <section className="new-members text-center w-100">
                <div className="container">
                    <h2 className="mt-5 mb-3 font-weight-bold text-center">Legújabb bébiszittereink</h2>
                    <div className="row">
                        {newMembers}
                    </div>
                </div>
            </section>
        );
    }
}

export default NewMembers;