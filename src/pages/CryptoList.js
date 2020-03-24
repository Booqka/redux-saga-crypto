import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {Input, Row, Col, Table, Select, Button} from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons/lib/icons"

import { fetchCrypto } from '../actions'

const { Option } = Select;

const Crypto = (props) => {
  const { fetchCrypto, state: { error, cryptos } } = props;
  const [qty, setQty] = useState(1);
  const [costInUsd, setCostInUsd] = useState(0);
  const [selectedCurrency, selectCurrency] = useState(0);

  useEffect(() => {
    fetchCrypto();
    setInterval(() => {
      fetchCrypto()
    }, 2000)
  }, [fetchCrypto]);

  if (error) {
    return <p>Error: {error}</p>
  }

  const columns = [
    {
      title: 'Currency',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => {
        return (
            <Button onClick={() => {
              setCostInUsd((record.price * qty).toFixed(2))
              selectCurrency(name)
            }} type={"link"}>{name}</Button>
        )
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => Number(price).toFixed(4),
    },
    {
      title: 'Growth',
      dataIndex: 'growth',
      key: 'growth',
      render: growth => {
        if (growth)
          return (
              <ArrowUpOutlined style={{
                color: 'green',
                fontSize: 36,
              }} />
          );
        else
          return (
              <ArrowDownOutlined style={{
                color: 'red',
                fontSize: 36,
              }} />
          )
      },
    },
  ];

  const cryptoCurrencies = cryptos.map(({name}) => name);

  function onChange(value) {
    const { price } = cryptos.find(item => item.name === value);
    selectCurrency(value);
    setCostInUsd((price * qty).toFixed(2))
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Table
              bordered
              rowKey={'name'}
              dataSource={cryptos}
              columns={columns}
              pagination={false}/>
        </Col>
        <Col span={6}>
          <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              value={selectedCurrency}
              filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
          >
            {
              cryptoCurrencies.map(item => (
                  <Option value={item} key={item}>
                    {item}
                  </Option>
              ))
            }
          </Select>
              <Input
                  addonBefore="Input quantity&nbsp;"
                  placeholder="Quantity"
                  value={qty}
                  onChange={({target}) => {
                    setQty(Number(target.value));
                    console.log(qty);
                    setCostInUsd((target.value * costInUsd).toFixed(2))
                  }}
              />
              <Input
                  addonBefore="Price in USD&nbsp;&nbsp;&nbsp;"
                  value={costInUsd}
                  placeholder="Count" />
        </Col>
      </Row>
    </>
  )
};

const mapStateToProps = state => {
  return {
    state: state.reducers,
  }
};

const mapDispatchToProps = {
  fetchCrypto,
};

const CryptoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Crypto);

export default CryptoList
