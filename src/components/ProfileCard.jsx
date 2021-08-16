import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Icon, Button } from 'semantic-ui-react';
import { logout } from '../actions/authAction';

const Profilecard = () => {
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();


    return (
        <div className="profile-card" id='profileInfo'>
            <Card>
                <Card.Content>
                    <Card.Header>{auth.authenticated ? `${auth.firstName} ${auth.lastName}` : ' '}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <p>
                        <Icon name='user' />
                        {user.users.length} Friends
                    </p>
                </Card.Content>
                {
                    auth.authenticated ?
                        <Link to={'#'}
                            onClick={() => { dispatch(logout(auth.uid)) }}>
                            <Button animated='vertical' style={{width : '100%'}}>
                                <Button.Content hidden>Log Out</Button.Content>
                                <Button.Content visible>
                                    <Icon name='setting' />
                                </Button.Content>
                            </Button>
                        </Link> : null
                }

            </Card>
        </div>
    );
};

export default Profilecard;