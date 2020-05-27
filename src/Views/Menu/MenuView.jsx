import React, { Component } from 'react';
import { Tabs, Row, Col, Button } from 'antd';

import Section from '../../Components/Sections';
import AddComment from '../../Components/AddComment';
import AddGrade from '../../Components/AddGrade';

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
      addCommentVisible: false,
      addGradeVisible: false,
    };
  }

  componentDidMount() {
    this.getMenu()
  }

  getMenu = async () => {
    const { id } = this.props.match.params
    // fetch(`http://localhost:3001/api/menus/${id}`, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    // })
    //   .then(response => response.json())
    //   .then(menu => this.setState({ menu })).catch(() => {
        this.setState({
          menu: {
            title: 'Los Castores: Platillos fuertes',
            description: 'Extensa variedad de platillos fuertes ',
            image_url: '123.com',
            menu_color: '#dc1c1c',
            text_color: '#ffffff',
            rating_color: '#d1c340',
            admin_user_id: 2,
            califications: [],
            waiters: [
              {
                id: 1,
                image_url: 'https://pbs.twimg.com/profile_images/979971538781745153/p1b4wWIf_400x400.jpg',
                name: 'Santiago',
                last_name: 'Cantu',
                role: 'Employee',
                califications: [
                  {
                    rating: 5,
                  },
                  {
                    rating: 1.7,
                  }
                ]
              },
              {
                id: 2,
                image_url: 'https://pbs.twimg.com/profile_images/979971538781745153/p1b4wWIf_400x400.jpg',
                name: 'Juan',
                last_name: 'Cantu',
                role: 'Employee',
                califications: [
                  {
                    rating: 5,
                  },
                  {
                    rating: 1.7,
                  }
                ]
              },
              {
                id: 3,
                image_url: 'https://pbs.twimg.com/profile_images/979971538781745153/p1b4wWIf_400x400.jpg',
                name: 'Rafael',
                last_name: 'Cantu',
                role: 'Employee',
                califications: [
                  {
                    rating: 5,
                  },
                  {
                    rating: 1.7,
                  }
                ]
              },
            ],
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
                    media_files: [
                      {
                        position: 1,
                        type_media: 'video',
                        url: 'https://www.youtube.com/watch?v=YR5YJ3qzIx4',
                      },
                      {
                        position: 2,
                        type_media: 'image',
                        url: 'https://dam.cocinafacil.com.mx/wp-content/uploads/2019/08/tacos-campechanos.jpg',
                      },
                    ],
                    section_id: 1,
                    position: '2.0',
                  },
                  {
                    name: 'Hamburguesa King',
                    description: 'Deliciosa hamburguesa de pollo con aros de cebolla y salsa buffalo',
                    price: '120.0',
                    rating: '4.0',
                    media_files: [
                      {
                        position: 1,
                        type_media: 'video',
                        url: 'https://www.youtube.com/watch?v=YR5YJ3qzIx4',
                      },
                      {
                        position: 1,
                        type_media: 'image',
                        url: 'https://dam.cocinafacil.com.mx/wp-content/uploads/2019/08/tacos-campechanos.jpg',
                      },
                    ],
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
                products: [],
              },
            ],
          }
        })
      // });
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

  sortSections = (a, b) => {
    if (Number(a.page_number) > Number(b.page_number)) {
      return 1;
    } else if (Number(a.page_number) < Number(b.page_number)) {
      return -1;
    } else {
      return 0;
    }
  };

  submitComment = async (data) => fetch(`http://localhost:3001/api/suggestions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(({ menu_id }) => ({ menu_id }))
    .catch((error) => ({ error }));

  submitGrade = async (data) => fetch(`http://localhost:3001/api/califications`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(({ menu_id }) => ({ menu_id }))
    .catch((error) => ({ error }));

  render() {
    const { id: idMenu } = this.props.match.params;
    const {
      menu: {
        title,
        sections,
        menu_color,
        text_color,
        rating_color,
        waiters,
      },
      tab,
      addCommentVisible,
      addGradeVisible,
    } = this.state;
    const menuColor = this.hexToRgbA(menu_color, 0.5);
    const product_color_inverse = this.hexToRgbA(menu_color, 1);
    document.body.style.background = menuColor;
    return (
      <div className="menu-container" style={{
        paddingTop: '2%',
      }} >
        <AddComment
          visible={addCommentVisible}
          handleCancel={() => this.setState({ addCommentVisible: false })}
          idMenu={idMenu}
          submitComment={this.submitComment}
        />
        <AddGrade
          visible={addGradeVisible}
          handleCancel={() => this.setState({ addGradeVisible: false })}
          idMenu={idMenu}
          waiters={waiters}
          submitGrade={this.submitGrade}
        />
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <h1
              className="section"
              style={{
                color: text_color,
              }}
            >{title}</h1>
          </Col>
          <Col span={6}>
            <div style={{ padding: 5 }}>
              <Button
                color={text_color}
                style={{ width: '80%' }}
                onClick={() => this.setState({ addCommentVisible: true })}
                ghost
              >
                Sugerencias y comentarios
              </Button>
            </div>
            <div style={{ padding: 5 }}>
              <Button
                color={text_color}
                style={{ width: '80%' }}
                ghost
                onClick={() => this.setState({ addGradeVisible: true })}
              >
                Calificar Servicio
              </Button>
            </div>
          </Col>
        </Row>
        <Tabs style={{
          color: text_color
        }} defaultActiveKey={tab} onChange={(e) => this.setState({ tab: e })}>
            {sections.sort(this.sortSections).map((section, i) => {
              return (
                <TabPane tab={section.title} key={i}>
                  <Section
                    rating_color={rating_color}
                    product_color_inverse={product_color_inverse}
                    text_color={text_color} section={section}
                  />
                </TabPane>
              )
            })}
            <TabPane tab="Equipo" key={sections.length}>
              <Section
                rating_color={rating_color}
                product_color_inverse={product_color_inverse}
                text_color={text_color}
                waiters={waiters}
              />
            </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default MenuView;
