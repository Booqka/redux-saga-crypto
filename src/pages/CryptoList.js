import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Input, Statistic, Row, Col, Card } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

import { fetchCrypto } from '../actions'

const Crypto = (props) => {
  const { fetchCrypto, state: { ETH, error, BTC } } = props;
  const [qty, setQty] = useState(1)
  const [costInUsd, setCostInUsd] = useState(qty * BTC)
  const [selectedCurrency, selectCurrency] = useState(BTC)

  useEffect(() => {
    fetchCrypto()
    setInterval(() => {
      fetchCrypto()
    }, 2000)
  }, [fetchCrypto])

  if (error) {
    return <p>Error: {error}</p>
  }
  return (
    <>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card onClick={() => {
              selectCurrency(BTC)
              setCostInUsd((BTC * qty).toFixed(2))
            }}
            >
              <Statistic
                title="BTC"
                value={BTC}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="$"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card onClick={() => {
              selectCurrency(ETH)
              setCostInUsd((ETH * qty).toFixed(2))
            }}>
              <Statistic
                title="Ethereum"
                value={ETH}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="$"
              />
            </Card>
          </Col>
        </Row>
      </div>
      <Card>
        <Col span={3}>
          <Input
            addonBefore="Input quantity&nbsp;"
            placeholder="Quantity"
            value={qty}
            onChange={({target}) => {
              setQty(target.value)
              setCostInUsd((target.value * selectedCurrency).toFixed(2))
            }}
          />
        </Col>
        <Col span={3}>
          <Input
            addonBefore="Price in USD&nbsp;&nbsp;&nbsp;"
            onChange={({target}) => {
              setQty((target.value / selectedCurrency).toFixed(2))
              setCostInUsd(target.value)
            }}
            value={costInUsd}
            placeholder="Count" />
        </Col>
      </Card>
    </>
  )
}

const mapStateToProps = state => {
  return {
    state: state.reducers,
  }
}

const mapDispatchToProps = {
  fetchCrypto,
}

const CryptoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Crypto)

export default CryptoList
