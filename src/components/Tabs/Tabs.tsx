import React, { useState } from 'react';
import cn from 'classnames';
import { Tab } from '../../types/Tab';

type Props = {
  tabs: Tab[];
  selectedTabId: string;
  onTabSelected: (tab: Tab) => void;
};

export const Tabs: React.FC<Props> = ({
  tabs,
  selectedTabId,
  onTabSelected,
}) => {
  const [selectedTab, setSelectedTab] = useState(
    tabs.find((tab) => tab.id === selectedTabId) || tabs[0],
  );

  const handleTabClick = (tab: Tab) => {
    if (tab.id !== selectedTab.id) {
      setSelectedTab(tab);
      onTabSelected(tab);
    }
  };

  return (
    <div data-cy="TabsComponent">
      <div className="tabs is-boxed">
        <ul>
          {tabs.map((tab) => {
            const { id, title } = tab;

            return (
              <li
                key={id}
                className={cn({ 'is-active': id === selectedTab.id })}
                data-cy="Tab"
              >
                <a
                  href={`#${id}`}
                  data-cy="TabLink"
                  onClick={() => handleTabClick(tab)}
                >
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="block" data-cy="TabContent">
        {selectedTab.content}
      </div>
    </div>
  );
};
