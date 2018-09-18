import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { inject, observer } from 'mobx-react';
import { List, Toast, Modal, WhiteSpace, SegmentedControl } from 'antd-mobile';
import Destination from '../../components/destination';
import { destinationData } from '../../components/destination/data';
import AreaPicker from '../../components/areaPicker';
import Header from '../../components/header';
import Footer from '../../components/footer';

const Item = List.Item;

interface Props {
  modal?: boolean;
  ui: string;
}

interface SelectedItemObject {
  name: string;
  optionId: number;
}

interface State {
  modal: boolean;
  destinationShow: boolean;
  destinationSeleted: [SelectedItemObject];
}

@inject('uiStore')
@observer
class UI extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      destinationShow: false,
      destinationSeleted: [
        {
          name: 'France法国',
          optionId: 126,
        },
        ],
    };
  }

  public showModal = () => {
    this.setState({
      modal: true,
    });
  }

  public hideModal = () => {
    this.setState({
      modal: false,
    });
  }

  public showLoading = () => {
    Toast.loading('Loading...', 1, () => {
      console.log('Load complete !!!');
    });
  }

  public showDestination = () => {
    this.setState({
      destinationShow: true,
    });
  }

  public hideDestination = () => {
    this.setState({
      destinationShow: false,
    });
  }

  public onClickDestinationBack = () => {
    this.hideDestination();
  }

  public onDestinationConfirm = (value) => {
    this.setState({
      destinationSeleted: value,
    });
    this.hideDestination();
  }

  public getDestinationText = () => {
    const text = [];
    if (!this.state.destinationSeleted.length) {
      return '请选择';
    }
    this.state.destinationSeleted.forEach((item) => {
      text.push(item.name);
    });
    return text.join(',').replace(/[a-zA-Z().]/g, '');
  }

  public render() {
    return (
      <div>
        <Header title={'新一站保险网'} showMiniNavBtn={true} showSearchBtn={true} showCategoryBtn={true}/>
        <Item onClick={this.showModal}>Modal</Item>
        <Item onClick={this.showLoading}>Loading(To Do)</Item>
        <Item onClick={this.showDestination} arrow={'horizontal'} extra={this.getDestinationText()}>目的地选择</Item>
        <Item>省市区选择(To Do)</Item>
        <List renderHeader={() => '分段器'}>
          <SegmentedControl values={[ '栏目一', '栏目二' ]} />
        </List>
        <WhiteSpace />
        <Footer />
        <Modal
          visible={this.state.modal}
          transparent
          maskClosable={false}
          title="Title"
          footer={[ { text: '关闭', onPress: () => { this.hideModal(); } } ]}
        >
          <div>
            普通的对话框
          </div>
        </Modal>
        <Destination
          visible={this.state.destinationShow}
          data={destinationData}
          selectedItem={this.state.destinationSeleted}
          onBackClick={this.onClickDestinationBack}
          onConfirm={this.onDestinationConfirm}
        />
        <AreaPicker/>
      </div>
    );
  }
}

export default hot(module)(UI);
