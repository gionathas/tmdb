import React, { Fragment, ReactNode } from "react";

export type ListProps<T> = {
  title: ReactNode;
  emptyTitle: ReactNode;
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
  className?: string;
};

const List = <T extends unknown>({
  title,
  emptyTitle,
  items,
  renderItem,
  keyExtractor,
  className = "",
}: ListProps<T>) => {
  const itemList = items.map((item) => (
    <Fragment key={keyExtractor(item)}>{renderItem(item)}</Fragment>
  ));
  return (
    <>
      {title}
      <div className={className}>
        {itemList.length > 0 ? itemList : emptyTitle}
      </div>
    </>
  );
};

export default List;
