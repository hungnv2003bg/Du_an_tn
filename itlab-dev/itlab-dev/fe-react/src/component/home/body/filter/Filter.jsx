import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../language/selectLanguage";
import { FiFilter } from "react-icons/fi";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
} from "@chakra-ui/react";
import { Col, InputNumber, Radio, Row, Slider, Space, Tag } from "antd";
import { Checkbox as ckr } from "antd";
import { useState } from "react";
import { fixMoney } from "../../../../extensions/fixMoney";
import Tag1 from "../../../common/tag/Tag1";
function Filter() {
  const language = useSelector(selectLanguage);
  const [value, setValue] = useState(undefined);
  const [searchParam, setSearchParam] = useState({
    isEmpty: false,
    color: [
      {
        id: 1,
        name: "vàng",
      },
    ],
    type: [
      {
        id: 1,
        name: "Áo ngắn tay",
      },
    ],
    size: [
      {
        id: 2,
        name: "Size XL",
      },
    ],
    cost: {
      isUse: false,
      min: 0,
      max: 100,
    },
  });
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const formatter = (value) => {
    return fixMoney(value);
  };
  const [inputValue, setInputValue] = useState(1);
  const [inputValueSlider, setInputValueSlider] = useState(1);
  const onChangeSlider = (newValue) => {
    setInputValue(newValue);
  };
  const options = [
    {
      label: "Apple",
      value: "Apple",
    },
    {
      label: "Pear",
      value: "Pear",
    },
    {
      label: "Orange",
      value: "Orange",
    },
    {
      label: "Apple",
      value: "Apple",
    },
    {
      label: "Pear",
      value: "Pear",
    },
    {
      label: "Orange",
      value: "Orange",
    },
    {
      label: "Apple",
      value: "Apple",
    },
    {
      label: "Pear",
      value: "Pear",
    },
    {
      label: "Orange",
      value: "Orange",
    },
  ];
  return (
    <>
      <div className="filter-container">
        <div className="title">
          <span>{language.body.filter.title}</span>
          <div>
            <FiFilter />
          </div>
        </div>
        <div className="filter-item">
          {!searchParam.isEmpty ? (
            <div
              style={{
                marginBottom: "8px",
              }}
            >
              <Space>
                <Tag1 color="pink" content="giá" />
                <Tag color="purple">Xóa tất cả</Tag>
              </Space>
            </div>
          ) : (
            ""
          )}
          <Accordion allowMultiple allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {language.body.filter.item.type.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div
                  style={{
                    marginTop: "8px",
                    marginLeft: "8px",
                    width: "90%",
                  }}
                >
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                 
                  </Stack>
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {language.body.filter.item.size.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div
                  style={{
                    marginTop: "8px",
                    marginLeft: "8px",
                    width: "90%",
                  }}
                >
                  <ckr.Group
                    options={options}
                    defaultValue={["Pear"]}
                    onChange={() => {}}
                  />
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {language.body.filter.item.color.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div
                  style={{
                    marginTop: "8px",
                    marginLeft: "8px",
                    width: "90%",
                  }}
                >
                  <ckr.Group
                    options={options}
                    defaultValue={["Pear"]}
                    onChange={() => {}}
                  />
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {language.body.filter.item.cost.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div
                  style={{
                    marginTop: "8px",
                    marginLeft: "8px",
                    width: "90%",
                  }}
                >
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      {language.body.filter.item.cost.option.map(
                        (item, index) => {
                          return (
                            <Radio value={item.type} key={index}>
                              {item.name}
                            </Radio>
                          );
                        }
                      )}
                    </Space>
                  </Radio.Group>
                  <Row>
                    <Col span={24}>
                      <Slider
                        range={{
                          draggableTrack: true,
                        }}
                        tooltip={{
                          formatter,
                        }}
                        min={100000}
                        max={10000000}
                        defaultValue={[500000, 2000000]}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11}>
                      <InputNumber
                        min={1}
                        max={20}
                        style={{ width: "100%" }}
                        value={onChangeSlider}
                        onChange={onChangeSlider}
                      />
                    </Col>
                    <Col
                      span={2}
                      className="d-flex align-items-center justify-content-center"
                    >
                      -
                    </Col>
                    <Col span={11}>
                      <InputNumber
                        min={1}
                        max={20}
                        style={{ width: "100%" }}
                        value={onChangeSlider}
                        onChange={onChangeSlider}
                      />
                    </Col>
                  </Row>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default Filter;
