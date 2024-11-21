import React from 'react';
import {
  ourMissionArticleH2,
  ourOfferBlock,
  ourOfferRow,
  ourOffercard,
  offerCardSvg,
  offerCardTitle,
  offerCardtext,
} from '@/utils/cva';
import bookSvg from '@/assets/svg/book.svg';
import comm from '@/assets/svg/community.svg';
import lightning from '@/assets/svg/lightning.svg';
import { useTranslation } from 'react-i18next';

const Offer: React.FC = () => {
  const { t } = useTranslation('about');

  return (
    <div className={ourOfferBlock()}>
      <h1 className={ourMissionArticleH2()}>{t('offer.title')}</h1>
      <div className={ourOfferRow()}>
        <div className={ourOffercard()}>
          <img src={bookSvg} alt="" className={offerCardSvg()} />
          <h4 className={offerCardTitle()}>{t('offer.richContent.title')}</h4>
          <p className={offerCardtext()}>
            {t('offer.richContent.description')}
          </p>
        </div>
        <div className={ourOffercard()}>
          <img src={comm} alt="" className={offerCardSvg()} />
          <h4 className={offerCardTitle()}>
            {t('offer.vibrantCommunity.title')}
          </h4>
          <p className={offerCardtext()}>
            {t('offer.vibrantCommunity.description')}
          </p>
        </div>
        <div className={ourOffercard()}>
          <img src={lightning} alt="" className={offerCardSvg()} />
          <h4 className={offerCardTitle()}>
            {t('offer.cuttingEdgeTopics.title')}
          </h4>
          <p className={offerCardtext()}>
            {t('offer.cuttingEdgeTopics.description')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offer;
