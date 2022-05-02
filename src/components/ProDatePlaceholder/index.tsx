import React from 'react';
interface ProDatePlaceholderProps {
  date?: string;
}
const ProDatePlaceholder: React.FC<ProDatePlaceholderProps> = (props) => {
  return <span>{props.date || '---/--/-- --:--:--'}</span>;
};

export default ProDatePlaceholder;
