import React from 'react';
import ProductCardPropTypes from './PropsTypes';
import style from './index.module.less';

export default class ProductCard extends React.Component<ProductCardPropTypes, any> {
  public static defaultProps = {
    isShowAllBenefits: false,
  };
  public constructor(props) {
    super(props);
    this.state = {
      isShowAllBenefits: props.isShowAllBenefits,
    };
  }

  public render() {
    const { title, tags, insurePlan, brandImg, isFixedPrice, price, benefits } = this.props;

    const productItemInfoTmpl = (itemInfo) => {
      const key = Object.keys(itemInfo)[0];
      return (
        <div className={`${style.description} ${style['productCard__' + key]}`}>
          {itemInfo[key].map((item, index) =>
            <div key={index} className={style.description__item}>{item}</div>,
          )}
        </div>
      );
    };

    const benefitsTmpl = (benefit) => {
      if (!benefit) {
        return ;
      }

      return (
        <div className={style.explain}>
          {benefit.length > 3 &&
          <span className={style[`explain__icon`]} onClick={this.switchBenefitsState}/>
          }

          <ul className={style[`explain__items`]}>
            {benefit.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <span>{item.quota}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    const priceHTML = (
      <div
        className={style[`price__info`]}
      >
        {price.split('.')[0]}.
        {
          <span
            className={style['productCard-price-small']}
          >
            {price.split('.')[1]}
          </span>
        }
        {
          isFixedPrice &&
          <span className={style[`price__extra`]}>起</span>
        }
      </div>
    );
    return (
      <dl
        className={
        this.state.isShowAllBenefits
          ? `${style.productCard} ${style.active}`
          : style.productCard}
      >
        <dt>
          <h3 className={style.title}>{title}</h3>
        </dt>
        <dd>
          {
            tags &&
            <div>
              {
                tags.map(item =>
                  <span key={item} className={style.tag}>{item}</span>,
                )
              }
          </div>
          }
          {insurePlan && productItemInfoTmpl({ insurePlan })}
          {
            price && productItemInfoTmpl({
            price: [
              !brandImg ? '' : (<img src={brandImg} className={style.brand}/>),
              priceHTML,
            ],
          })}

          {
            benefitsTmpl(benefits)
          }
        </dd>
      </dl>
    );
  }
  private switchBenefitsState = () => {
    this.setState({
      isShowAllBenefits: !this.state.isShowAllBenefits,
    });
  }
}
