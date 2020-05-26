import React, { Component } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';

import Section from '../../Components/Sections'

import './styles.css';

const { TabPane } = Tabs;

class MenuView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {
        title: '',
        description: '',
        sections: [],
        menu_color: '#fff',
        text_color: '#000',
        rating_color: null
      },
      tab: 0,
    };
  }

  componentDidMount() {
    this.getMenu()
  }

  getMenu = async () => {
    const { id } = this.props.match.params
    const { menu } = axios.get(`http:localhost:3001/menu/${id}`)
    if (menu) {
      this.setState({ menu });
    } else {
      this.setState({
        menu: {
          title: 'Los Castores: Platillos fuertes',
          description: 'Extensa variedad de platillos fuertes ',
          image_url: '123.com',
          menu_color: '#dc1c1c',
          text_color: '#ffffff',
          rating_color: '#d1c340',
          admin_user_id: 2,
          sections: [
            {
              title: 'Hamburguesas de Pollo',
              description: 'Hamburguesas hechas con carne de pollo',
              image_url: '123.com',
              menu_id: 1,
              page_number: '1.0',
              products: [
                {
                  name: 'Boneless Burger',
                  description: 'Hamburguesa con pechuga de pollo banada en salsa boneless',
                  price: '120.0',
                  rating: '5.0',
                  image_url: '123.com',
                  video_url: '123.com',
                  section_id: 1,
                  position: '2.0',
                },
                {
                  name: 'Hamburguesa King',
                  description: 'Deliciosa hamburguesa de pollo con aros de cebolla y salsa buffalo',
                  price: '120.0',
                  rating: '4.0',
                  image_url: '123.com',
                  video_url: '123.com',
                  section_id: 1,
                  position: '1.0',
                },
              ],
            },
            {
              title: 'Caldos ',
              description: 'Caldos de la casa',
              image_url: '123.com',
              menu_id: 1,
              page_number: '2.0',
              products: [
                {
                  name: 'Caldo Tlalpeno',
                  description: 'Nuestro tradicional y mas delicioso, lleva aguacate, queso',
                  price: '100.0',
                  rating: '4.0',
                  image_url: '123.com',
                  video_url: '123.com',
                  section_id: 2,
                  position: '2.0',
                },
                {
                  name: 'Caldo de Res',
                  description: 'Caldo inventado por la casa, lleva res y verduras',
                  price: '100.0',
                  rating: '5.0',
                  image_url: '123.com',
                  video_url: '123.com',
                  section_id: 2,
                  position: '1.0',
                },
              ],
            },
          ],
        }
      })
    }
  }

  hexToRgbA(hex, opacity) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, ${opacity})`
    }
    return hex;
  }

  render() {
    console.log(this.state)
    const { menu: {
      title,
      sections,
      menu_color,
      text_color,
      rating_color,
    }, tab } = this.state;
    const menuColor = this.hexToRgbA(menu_color, 0.5);
    const product_color_inverse = this.hexToRgbA(menu_color, 1);
    return (
      <div className="menu-container" style={{
        paddingTop: '2%',
        backgroundColor: menuColor,
      }} >
        <h1
          className="section"
          style={{
            color: text_color,
          }}
        >{title}</h1>
        <Tabs style={{
          color: text_color
        }} defaultActiveKey={tab} onChange={(e) => this.setState({ tab: e })}>
          {sections.map((section, i) => {
            return (
              <TabPane tab={section.title} key={i}>
                <Section rating_color={rating_color} product_color_inverse={product_color_inverse} text_color={text_color} section={section} />
              </TabPane>
            )
          })}
        </Tabs>
      </div>
    )
  }
}

export default MenuView;
