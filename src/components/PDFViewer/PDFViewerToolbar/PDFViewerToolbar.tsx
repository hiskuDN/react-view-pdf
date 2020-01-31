import * as React from 'react';
import { ActionLink, distance, Flyout, Icon, styled, themed, Tooltip, StandardProps, AnchorProps } from 'precise-ui';
import { PageViewMode } from '../../../types/pdfViewer';
import { toCamel } from '../../../utils/hacks';

const Toolbar = styled.ul`
  background-color: ${themed(({ theme = {} }: StandardProps) => theme.ui5)};
  color: ${themed(({ theme = {} }: StandardProps) => theme.text4)};
  padding: 0 ${distance.medium};
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;

  position: relative;
  opacity: 0.1;
  transition: opacity 0.5s 1s ease-in-out;
`;

const ToolbarWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;

  :hover ${Toolbar} {
    transition: opacity 0.5s 0s ease-in-out;
    opacity: 1;
  }
`;

const ToolbarItem = styled.li`
  display: list-item;
  padding: ${distance.medium} ${distance.xxsmall};
`;

const ToolbarSeparator = styled.li`
  margin: ${distance.small} ${distance.medium};
  width: 1px;
  overflow: hidden;
  background-color: ${themed(({ theme = {} }: StandardProps) => theme.ui4)};
`;

const ToolbarTextField = styled.input`
  border: 0;
  padding: 0;
  height: 21px;
  width: 3em;
`;

const ToolbarDropdownListItem = styled.div`
  padding: ${distance.small} ${distance.medium};
  background-color: ${themed(({ theme = {} }: StandardProps) => theme.ui5)};
  white-space: nowrap;
`;

const ToolbarTooltip = styled(Tooltip)`
  font-size: 0.8em;
  white-space: nowrap;
`;

const ToolbarActionLink = styled(ActionLink)`
  color: ${themed(({ theme = {}, disabled }: StandardProps & AnchorProps) => (disabled ? theme.text3 : theme.text4))};
  display: flex;
  align-items: center;
  height: 16px;

  :hover,
  :visited,
  :focus {
    color: ${themed(({ theme = {}, disabled }: StandardProps & AnchorProps) => (disabled ? theme.text3 : theme.text4))};
  }
`;

export interface PDFViewerToolbarProps {
  currentPage: number;
  currentViewMode: PageViewMode;
  numPages: number;
  currentScale: number;
  fullscreen: boolean;
  onPageChange(pageNum: number): void;
  onScaleChange(pageNum: number): void;
  onViewModeChange(viewMode: PageViewMode): void;
  onFullscreenChange(): void;
}

/**
 * The `Document` is a wrapper to load PDFs and render all the pages
 */
export const PDFViewerToolbar: React.FC<PDFViewerToolbarProps> = props => {
  const translate = (text: string) => text;

  const pageInputRef = React.useRef<HTMLInputElement>();

  const [editingPageNumber, SetEditingPageNumber] = React.useState<boolean>();
  const [editingViewMode, SetEditingViewMode] = React.useState(false);

  /**
   * Returns the next view mode text to be used as tooltip
   */
  function getViewModeText() {
    return translate(
      `pdfViewerViewMode${toCamel(PageViewMode[props.currentViewMode >= 3 ? 0 : props.currentViewMode])}`,
    );
  }

  /**
   * Returns the next view mode text to be used as tooltip
   */
  function getViewModeIcon() {
    switch (props.currentViewMode) {
      case PageViewMode.FIT_TO_WIDTH:
        return 'FitToWidth';
      case PageViewMode.FIT_TO_HEIGHT:
        return 'FitToHeight';
      case PageViewMode.DEFAULT:
        return 'Page';
    }
  }

  /**
   * Event triggered when the page number is clicked, thus entering page enter mode
   */
  function onPageNumberFocused() {
    SetEditingPageNumber(true);
  }

  React.useEffect(() => {
    if (pageInputRef.current) {
      pageInputRef.current.focus();
    }
  }, [pageInputRef, editingPageNumber]);

  /**
   * Event triggered when the page number field is blurred / changed
   */
  function onPageNumberDefocused() {
    SetEditingPageNumber(false);

    // Now let's check the value
    if (pageInputRef.current && pageInputRef.current.value !== '') {
      const inputPage = Number(pageInputRef.current.value);
      if (!isNaN(inputPage)) {
        props.onPageChange(inputPage);
      }
    }
  }

  function onViewModeChange(viewMode: PageViewMode) {
    SetEditingViewMode(false);
    props.onViewModeChange(viewMode);
  }

  return (
    <ToolbarWrapper>
      <Toolbar>
        <ToolbarItem>
          <ToolbarTooltip content={translate('pdfViewerPrevPage')} position="top" offset={16}>
            <ToolbarActionLink
              onClick={() => props.onPageChange(props.currentPage - 1)}
              disabled={props.currentPage <= 1}>
              <Icon name="KeyboardArrowLeft" />
            </ToolbarActionLink>
          </ToolbarTooltip>
        </ToolbarItem>
        <ToolbarItem>
          Page &nbsp;
          {editingPageNumber ? (
            <ToolbarTextField
              ref={pageInputRef}
              onBlur={onPageNumberDefocused}
              onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && onPageNumberDefocused()}
            />
          ) : (
            <span onClick={() => onPageNumberFocused()}>{translate('pdfViewerPagesOf')}</span>
          )}
        </ToolbarItem>
        <ToolbarItem>
          <ToolbarTooltip content={translate('pdfViewerNextPage')} position="top" offset={16}>
            <ToolbarActionLink
              onClick={() => props.onPageChange(props.currentPage + 1)}
              disabled={props.currentPage >= props.numPages}>
              <Icon name="KeyboardArrowRight" />
            </ToolbarActionLink>
          </ToolbarTooltip>
        </ToolbarItem>

        <ToolbarSeparator />

        <ToolbarItem>
          <ToolbarTooltip content={translate('pdfViewerZoomOut')} position="top" offset={16}>
            <ToolbarActionLink
              onClick={() => {
                const scaleToPrev = Math.round((props.currentScale % 0.1) * 100) / 100;
                props.onScaleChange(props.currentScale - (scaleToPrev === 0 ? 0.1 : scaleToPrev));
              }}
              disabled={props.currentScale <= 0.5}>
              <Icon name="Remove" />
            </ToolbarActionLink>
          </ToolbarTooltip>
        </ToolbarItem>
        <ToolbarItem>{Math.round(props.currentScale * 100)}%</ToolbarItem>
        <ToolbarItem>
          <ToolbarTooltip content={translate('pdfViewerZoomIn')} position="top" offset={16}>
            <ToolbarActionLink
              onClick={() => {
                const scaleToPrev = Math.round((props.currentScale % 0.1) * 100) / 100;
                props.onScaleChange(props.currentScale + 0.1 - (scaleToPrev === 0.1 ? 0 : scaleToPrev));
              }}
              disabled={props.currentScale >= 2.5}>
              <Icon name="Add" />
            </ToolbarActionLink>
          </ToolbarTooltip>
        </ToolbarItem>

        <ToolbarItem>
          <Flyout
            position="top"
            noGutter
            open={editingViewMode}
            offset={16}
            theme={{ flyout: { background: themed(({ theme = {} }: StandardProps) => theme.ui5) } }}
            content={
              <>
                <ToolbarDropdownListItem>
                  <ToolbarActionLink onClick={() => onViewModeChange(PageViewMode.FIT_TO_WIDTH)}>
                    <Icon name="FitToWidth" /> {translate('pdfViewerViewModeFitToWidth')}
                  </ToolbarActionLink>
                </ToolbarDropdownListItem>
                <ToolbarDropdownListItem onClick={() => onViewModeChange(PageViewMode.FIT_TO_HEIGHT)}>
                  <ToolbarActionLink>
                    <Icon name="FitToHeight" /> {translate('pdfViewerViewModeFitToHeight')}
                  </ToolbarActionLink>
                </ToolbarDropdownListItem>
              </>
            }>
            <ToolbarActionLink onClick={() => SetEditingViewMode(!editingViewMode)}>
              <Icon name={getViewModeIcon()} size="24px" />
              {getViewModeText()}
              <Icon name={editingViewMode ? 'ArrowDropUp' : 'ArrowDropDown'} size="24px" />
            </ToolbarActionLink>
          </Flyout>
        </ToolbarItem>

        <ToolbarSeparator />

        <ToolbarItem>
          <ToolbarTooltip
            content={translate(props.fullscreen ? 'pdfViewerFullscreenExit' : 'pdfViewerFullscreen')}
            position="top"
            offset={16}>
            <ToolbarActionLink onClick={() => props.onFullscreenChange()}>
              <Icon name={props.fullscreen ? 'FullscreenExit' : 'Fullscreen'} size="24px" />
            </ToolbarActionLink>
          </ToolbarTooltip>
        </ToolbarItem>
      </Toolbar>
    </ToolbarWrapper>
  );
};
