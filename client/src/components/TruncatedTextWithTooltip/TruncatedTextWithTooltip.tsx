import React from 'react';
import { Tooltip } from 'antd';
import { removeHtmlTags, truncate } from '../../lib';

export const TruncatedTextWithTooltip = ( text:any, maxLength:any) => {
  const truncatedText = removeHtmlTags(truncate(text, maxLength));
  return (
    <Tooltip title={removeHtmlTags(text)}>
      <span>{truncatedText}</span>
    </Tooltip>
  );
};