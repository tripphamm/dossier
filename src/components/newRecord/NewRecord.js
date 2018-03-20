import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import * as recordsActions from 'redux/actions/recordsActions';

import Shell from 'components/shared/Shell';
import FloatingSaveButton from 'components/shared/floatingActionButtons/FloatingSaveButton';
import PersonAvatar from 'components/shared/PersonAvatar';

class NewRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      details: '',
      path: '',
    };

    this.textFieldOnChange = this.textFieldOnChange.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
  }

  textFieldOnChange(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

  async saveRecord() {
    const {
      match,
      history,
    } = this.props;

    const personId = match.params.personId;

    let path = this.state.path;

    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    if (!path.endsWith('/')) {
      path = path + '/';
    }

    const record = {
      key: this.state.title,
      value: this.state.details,
      path,
      personId,
    };

    await this.props.recordsActions.addRecord(record)

    history.goBack();
  }

  render() {
    const {
      match,
      history,
      persons,
    } = this.props;

    const personId = match.params.personId;
    const person = persons.find(person => person._id === personId);

    if (!person) {
      return <Redirect to="/" />
    }

    return (
      <Shell
        title="New Data"
        iconElementLeft={<KeyboardArrowLeft />}
        onLeftIconButtonClick={history.goBack}
      >
        <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px'}}>
          <PersonAvatar person={person} size={80} />
        </div>
        <TextField
          onChange={(event) => { this.textFieldOnChange('title', event); }}
          floatingLabelText="Title"
          fullWidth={true}
        />
        <TextField
          onChange={(event) => { this.textFieldOnChange('details', event); }}
          floatingLabelText="Details"
          fullWidth={true}
        />
        <TextField
          onChange={(event) => { this.textFieldOnChange('path', event); }}
          floatingLabelText="Folder"
          fullWidth={true}
        />
        <FloatingSaveButton onClick={this.saveRecord}/>
      </Shell>
    );
  }
}

function mapStateToProps(state) {
  return {
    persons: state.persons
  };
}

function mapDispatchToProps(dispatch) {
  return {
    recordsActions: bindActionCreators(recordsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRecord);