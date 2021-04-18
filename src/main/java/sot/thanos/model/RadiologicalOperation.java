package sot.thanos.model;

public class RadiologicalOperation {
    private String title;
    private String category;

    public RadiologicalOperation(String title, String category) {
        this.title = title;
        this.category = category;
    }

    public String getTitle() {
        return this.title;
    }

    public String getCategory() {
        return this.category;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
